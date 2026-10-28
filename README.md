# 💻 TP-Link Router CLI — Official Developer Web Showcase

<p align="center">
  <img src="https://raw.githubusercontent.com/dulithdivisekara/tp-link-cli-web/main/assets/terminal.svg" width="80" alt="CLI Logo" onerror="this.src='https://cdn-icons-png.flaticon.com/512/900/900782.png'" />
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/TP-Link_logo_2016.svg" width="130" alt="TP-Link Logo" />
</p>

<p align="center">
  <strong>Terminal-first landing page and interactive emulator for the TP-Link 4G/5G Router CLI.</strong>
</p>

<p align="center">
  <a href="https://tp-link-cli.dulith.me"><img src="https://img.shields.io/badge/Live_Showcase-tp--link--cli.dulith.me-00A499?style=for-the-badge&logo=cloudflare" alt="Live Demo" /></a>
  <a href="https://github.com/dulithdivisekara/tplink-cli"><img src="https://img.shields.io/badge/CLI_Tool-Repository-10B981?style=for-the-badge&logo=github" alt="CLI Repo" /></a>
  <a href="https://tp-link-mcp.dulith.me"><img src="https://img.shields.io/badge/Companion_MCP-tp--link--mcp.dulith.me-8B5CF6?style=for-the-badge&logo=cloudflare" alt="MCP Showcase" /></a>
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
</p>

---

## ⚡ Overview

This repository hosts the official developer landing page for **TP-Link CLI**, designed with Apple Human Interface Guidelines and dark terminal aesthetics. It showcases interactive command simulations (`status`, `signal`, `cell-lock`, `optimize-network`, `repl`), real-world cellular performance benchmarks (BBR, 1420 MTU GTP clamping, keepalive pulse), and multi-ecosystem package installation guides.

- **Live URL**: [https://tp-link-cli.dulith.me](https://tp-link-cli.dulith.me)
- **Fallback URL**: [https://tp-link-cli.pages.dev](https://tp-link-cli.pages.dev)
- **Author**: [Dulith Divisekara](https://dulith.me) (IT Undergraduate @ SLIIT Malabe, Sri Lanka)
- **Origin**: Born from optimizing Hutch Sri Lanka 4G unlimited package in the SLIIT Malabe area.

---

## 🚀 Instant Installation

```bash
# Universal one-line installer (Linux / macOS / Pi / WSL)
curl -fsSL https://tp-link-cli.dulith.me/install.sh | bash

# Debian / Ubuntu native package
curl -fsSLO https://tp-link-cli.dulith.me/tplink-cli_1.0.0_all.deb
sudo dpkg -i tplink-cli_1.0.0_all.deb

# Node.js Global CLI / npx
npm install -g @dulith/tplink-cli

# Python PyPI / pipx
pipx install tplink-cli

# macOS / Linux Homebrew
brew install dulithdivisekara/tap/tplink-cli
```

---

## 🛠️ Script-Driven Architecture

This project is completely schema-driven:

```text
tp-link-cli-web/
├── data/
│   ├── metadata.json       # Version, author, stats, and links
│   ├── commands.json       # 18 subcommands matrix with flags & descriptions
│   └── benchmarks.json     # Measured cellular performance metrics
├── js/
│   └── terminal.js         # Interactive terminal simulator & command switcher
├── scripts/
│   └── build.py            # Static generator: validates schemas and pre-renders HTML
├── install.sh              # Direct CDN installer script
├── tplink-cli_1.0.0_all.deb # Direct CDN Debian package
├── index.html              # Terminal-first developer landing page
├── .github/workflows/      # Automated Cloudflare Pages deployment CI
└── README.md
```

### Modifying Commands or Telemetry
To update commands or benchmark numbers, modify `data/commands.json` or `data/benchmarks.json` and run:
```bash
python3 scripts/build.py
```
Or run the central hub sync orchestrator in [`tplink-router-builder`](https://github.com/dulithdivisekara/tplink-router-builder).

---

## 💻 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dulithdivisekara/tp-link-cli-web.git
   cd tp-link-cli-web
   ```

2. **Validate schemas and pre-render**:
   ```bash
   python3 scripts/build.py
   ```

3. **Start local preview server**:
   ```bash
   python3 -m http.server 8081
   # Open http://localhost:8081 in your browser
   ```

---

## ☁️ Deployment

Deploys directly to **Cloudflare Pages** attached to `tp-link-cli.dulith.me`:
```bash
npx wrangler pages deploy . --project-name tp-link-cli --branch main
```

---

## 📜 License

Released under the [MIT License](LICENSE). Free for personal, academic, and commercial use.
