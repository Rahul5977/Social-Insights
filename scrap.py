#!/usr/bin/env python3
"""
Fetch Instagram hashtag data with API Dojo's scraper and save it as JSON.

Example:
    python scrap.py --hashtags '["weightloss", "weight"]' --limit 50
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from typing import Iterable

from apify_client import ApifyClient

ACTOR_ID = "apidojo/instagram-scraper-api"
DEFAULT_TOTAL_REELS = 50
DEFAULT_OUTPUT_FILE = "instagram_reels.json"


def normalize_hashtags(hashtags: Iterable[str]) -> list[str]:
    cleaned: list[str] = []
    seen: set[str] = set()

    for hashtag in hashtags:
        value = hashtag.strip().lstrip("#")
        if not value:
            continue
        lowered = value.lower()
        if lowered not in seen:
            cleaned.append(value)
            seen.add(lowered)

    return cleaned


def parse_hashtags(raw_value: str) -> list[str]:
    try:
        parsed = json.loads(raw_value)
    except json.JSONDecodeError as exc:
        raise argparse.ArgumentTypeError(
            "Hashtags must be a valid JSON array, for example: "
            '\'["travel", "food", "fitness"]\''
        ) from exc

    if not isinstance(parsed, list) or not all(isinstance(item, str) for item in parsed):
        raise argparse.ArgumentTypeError("Hashtags must be a JSON array of strings.")

    hashtags = normalize_hashtags(parsed)
    if not hashtags:
        raise argparse.ArgumentTypeError("Provide at least one non-empty hashtag.")

    return hashtags


def load_env_file(env_path: str) -> dict[str, str]:
    env_vars: dict[str, str] = {}

    if not os.path.exists(env_path):
        return env_vars

    with open(env_path, "r", encoding="utf-8") as file_handle:
        for raw_line in file_handle:
            line = raw_line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue

            key, value = line.split("=", 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")

            if key:
                env_vars[key] = value

    return env_vars


def get_apify_token() -> str:
    token = os.getenv("APIFY_API_TOKEN", "").strip()
    if token:
        return token

    script_dir = os.path.dirname(os.path.abspath(__file__))
    env_vars = load_env_file(os.path.join(script_dir, ".env"))
    return env_vars.get("APIFY_API_TOKEN", "").strip()


def build_hashtag_urls(hashtags: list[str]) -> list[str]:
    return [f"https://www.instagram.com/explore/tags/{hashtag}/" for hashtag in hashtags]


def fetch_items(
    api_token: str,
    hashtags: list[str],
    total_limit: int,
    until: str | None = None,
    custom_map_function: str | None = None,
) -> tuple[list[dict], dict]:
    client = ApifyClient(api_token)
    run_input = {
        "startUrls": build_hashtag_urls(hashtags),
        "maxItems": total_limit,
    }
    if until:
        run_input["until"] = until
    if custom_map_function:
        run_input["customMapFunction"] = custom_map_function

    run = client.actor(ACTOR_ID).call(run_input=run_input)

    items: list[dict] = []
    for item in client.dataset(run["defaultDatasetId"]).iterate_items():
        if isinstance(item, dict):
            items.append(item)

    return items, run


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Fetch Instagram hashtag data with API Dojo and return JSON."
    )
    parser.add_argument(
        "--hashtags",
        required=True,
        type=parse_hashtags,
        help='JSON array of hashtags, e.g. \'["travel", "food", "fitness"]\'',
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=DEFAULT_TOTAL_REELS,
        help=f"Maximum number of items to return in total. Default: {DEFAULT_TOTAL_REELS}",
    )
    parser.add_argument(
        "--output",
        default=DEFAULT_OUTPUT_FILE,
        help=f"Output JSON file path. Default: {DEFAULT_OUTPUT_FILE}",
    )
    parser.add_argument(
        "--until",
        default=None,
        help="Optional date filter. Returns posts newer than this date, e.g. 2026-05-01.",
    )
    parser.add_argument(
        "--custom-map-function",
        default=None,
        help="Optional API Dojo customMapFunction JavaScript string.",
    )

    # Legacy flags kept for backwards compatibility with previous runs.
    parser.add_argument("--candidate-limit", type=int, default=0, help=argparse.SUPPRESS)
    parser.add_argument("--transcript-candidate-limit", type=int, default=0, help=argparse.SUPPRESS)
    parser.add_argument("--min-india-score", type=int, default=0, help=argparse.SUPPRESS)
    parser.add_argument("--skip-transcript-analysis", action="store_true", help=argparse.SUPPRESS)

    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()

    if args.limit < 1:
        print("--limit must be greater than 0.", file=sys.stderr)
        return 1

    api_token = get_apify_token()
    if not api_token:
        print(
            "Set APIFY_API_TOKEN in the environment or in a local .env file first.",
            file=sys.stderr,
        )
        return 1

    try:
        items, run = fetch_items(
            api_token=api_token,
            hashtags=args.hashtags,
            total_limit=args.limit,
            until=args.until,
            custom_map_function=args.custom_map_function,
        )
    except Exception as exc:
        print(f"Apify request failed: {exc}", file=sys.stderr)
        return 1

    output_payload = {
        "hashtags": args.hashtags,
        "requested_limit": args.limit,
        "returned_count": len(items),
        "actor_id": ACTOR_ID,
        "dataset_id": run.get("defaultDatasetId"),
        "items": items,
    }

    with open(args.output, "w", encoding="utf-8") as file_handle:
        json.dump(output_payload, file_handle, indent=2, ensure_ascii=False)

    print(json.dumps(output_payload, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
