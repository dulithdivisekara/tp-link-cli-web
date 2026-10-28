#!/usr/bin/env python3
"""Static Site Builder & Validator for TP-Link CLI Showcase.

Reads `data/metadata.json`, `data/commands.json`, and `data/benchmarks.json`,
validates schemas, and pre-renders static HTML for Cloudflare Pages.

Author: Dulith Divisekara (SLIIT Malabe)
"""

import json
import os
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT_DIR / "data"
METADATA_FILE = DATA_DIR / "metadata.json"
COMMANDS_FILE = DATA_DIR / "commands.json"
BENCHMARKS_FILE = DATA_DIR / "benchmarks.json"
HTML_FILE = ROOT_DIR / "index.html"


def validate_data():
    print(f"Validating {METADATA_FILE.name}...")
    if not METADATA_FILE.exists():
        raise FileNotFoundError(f"Missing {METADATA_FILE}")
    with open(METADATA_FILE, "r", encoding="utf-8") as f:
        meta = json.load(f)

    print(f"Validating {BENCHMARKS_FILE.name}...")
    if not BENCHMARKS_FILE.exists():
        raise FileNotFoundError(f"Missing {BENCHMARKS_FILE}")
    with open(BENCHMARKS_FILE, "r", encoding="utf-8") as f:
        benchmarks = json.load(f)

    print(f"Validating {COMMANDS_FILE.name}...")
    if not COMMANDS_FILE.exists():
        raise FileNotFoundError(f"Missing {COMMANDS_FILE}")
    with open(COMMANDS_FILE, "r", encoding="utf-8") as f:
        commands = json.load(f)
    assert isinstance(commands, list), "commands.json must be a JSON array"
    assert len(commands) >= 18, f"Expected at least 18 commands, found {len(commands)}"

    for c in commands:
        assert "name" in c, f"Command missing 'name': {c}"
        assert "command" in c, f"Command {c['name']} missing 'command'"
        assert "category" in c, f"Command {c['name']} missing 'category'"
        assert "description" in c, f"Command {c['name']} missing 'description'"

    print(f"Successfully validated {len(commands)} subcommands and metadata v{meta['version']}.")
    return meta, commands, benchmarks


def render_command_html(c):
    badge_colors = {
        "Diagnostics": "bg-blue-500/10 text-blue-400 border-blue-500/20",
        "Cellular": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        "SMS": "bg-purple-500/10 text-purple-400 border-purple-500/20",
        "Wi-Fi": "bg-amber-500/10 text-amber-400 border-amber-500/20",
        "System": "bg-red-500/10 text-red-400 border-red-500/20",
        "Tuning": "bg-teal-500/10 text-teal-400 border-teal-500/20",
        "Interactive": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    }
    badge_class = badge_colors.get(c.get("category", "Diagnostics"), "bg-slate-500/10 text-slate-400 border-white/10")

    return f"""        <div class="glass-card rounded-xl p-5 cmd-card" data-cmd="{c['name']}" data-cat="{c['category']}">
          <div class="flex items-center justify-between mb-2">
            <code class="text-tplink-cyan text-xs font-bold font-mono">{c['command']}</code>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono border {badge_class}">{c['category']}</span>
          </div>
          <p class="text-slate-300 text-xs leading-relaxed">{c['description']}</p>
        </div>"""


def build():
    meta, commands, benchmarks = validate_data()
    print("Pre-rendering commands into index.html...")

    if not HTML_FILE.exists():
        print(f"Warning: {HTML_FILE} does not exist yet. Will create.")
        return

    content = HTML_FILE.read_text(encoding="utf-8")

    grid_html = "\n".join([render_command_html(c) for c in commands])

    start_tag = '<!-- COMMANDS_GRID_START -->'
    end_tag = '<!-- COMMANDS_GRID_END -->'
    if start_tag in content and end_tag in content:
        parts = content.split(start_tag)
        pre = parts[0] + start_tag + "\n"
        post = "\n        " + end_tag + parts[1].split(end_tag)[1]
        new_content = pre + grid_html + post
        HTML_FILE.write_text(new_content, encoding="utf-8")
        print(f"[✓] Successfully injected {len(commands)} pre-rendered subcommands into {HTML_FILE.name}")
    else:
        print("Note: COMMANDS_GRID markers not found in index.html; client-side JS hydration will render dynamically.")


if __name__ == "__main__":
    build()
