/**
 * TP-Link CLI Developer Showcase Engine
 * Terminal simulation, live command filtering, and install snippet switcher.
 * Author: Dulith Divisekara (SLIIT Malabe)
 */

const terminalDemos = {
  status: `<span class="text-slate-500">$</span> <span class="text-tplink-cyan font-semibold">tplink-cli status</span>
<span class="text-slate-400">Connecting to 192.168.1.1 (session auto-detected)...</span>
<span class="text-emerald-400 font-bold">[OK] Authenticated successfully</span>

<span class="text-white font-bold uppercase tracking-wider">Device Status</span>
--------------------------------------------------
<span class="text-slate-400">Model:</span>            TP-Link Archer MR600 / TL-MR100
<span class="text-slate-400">Hardware Ver:</span>     v2.0
<span class="text-slate-400">Firmware Ver:</span>     1.5.0 Build 231120 Rel.60211n
<span class="text-slate-400">WAN IP:</span>           100.92.14.88 (CGNAT)
<span class="text-slate-400">Gateway:</span>          10.64.0.1
<span class="text-slate-400">Primary DNS:</span>      1.1.1.1 (Cloudflare)
<span class="text-slate-400">Secondary DNS:</span>    8.8.8.8 (Google)
<span class="text-slate-400">Connection:</span>       Connected (4G LTE-Advanced)
<span class="text-slate-400">Carrier:</span>          Hutch Sri Lanka (PLMN 413-08)
<span class="text-slate-400">APN:</span>              hutch3g (PDP: IPv4)
<span class="text-slate-400">Uptime:</span>           14 days, 6 hours, 22 mins`,

  signal: `<span class="text-slate-500">$</span> <span class="text-tplink-cyan font-semibold">tplink-cli signal --watch</span>
<span class="text-slate-400">Streaming RF Telemetry (Press Ctrl+C to abort)...</span>

<span class="text-tplink-cyan font-bold">[17:55:01] Cell Radio Metrics:</span>
  Signal Strength: <span class="text-emerald-400 font-bold">████████░░ 78%</span> (4 / 5 Bars)
  RSRP:            <span class="text-emerald-400 font-bold">-92 dBm</span>     [Good]
  RSRQ:            <span class="text-amber-400 font-bold">-10 dB</span>      [Fair]
  SINR:            <span class="text-emerald-400 font-bold">14.6 dB</span>     [Optimal]
  RSSI:            <span class="text-slate-300">-68 dBm</span>
  Current Band:    <span class="text-white font-bold bg-tplink-teal/30 px-1.5 py-0.5 rounded">LTE Band 3 (1800 MHz FDD)</span>
  Physical Cell:   PCI 214 (eNodeB ID: 14201)
  EARFCN:          1600 (Downlink 1850 MHz)`,

  cell: `<span class="text-slate-500">$</span> <span class="text-tplink-cyan font-semibold">tplink-cli cell-lock --earfcn 1600 --band 3</span>
<span class="text-slate-400">Targeting Carrier Cell Lock...</span>
[1/3] Disconnecting current cellular session... <span class="text-emerald-400">OK</span>
[2/3] Writing AT+COPS / band selection lock for Band 3 (1800MHz)... <span class="text-emerald-400">OK</span>
[3/3] Re-attaching to Hutch eNodeB PCI 214... <span class="text-emerald-400">OK</span>

<span class="text-emerald-400 font-bold">[SUCCESS] Modem successfully locked to Band 3!</span>
SINR jumped from 6.2 dB (Band 8) -> 14.8 dB (Band 3).
Theoretical throughput headroom doubled.`,

  optimize: `<span class="text-slate-500">$</span> <span class="text-tplink-cyan font-semibold">tplink-cli optimize-network --apply</span>
<span class="text-slate-400">Executing Cellular Tuning Manifesto...</span>

<span class="text-emerald-400">[✓]</span> Setting sysctl net.ipv4.tcp_congestion_control = bbr
<span class="text-emerald-400">[✓]</span> Setting sysctl net.core.default_qdisc = fq
<span class="text-emerald-400">[✓]</span> Clamping MTU on wlan0 to 1420 (GTP Header Overhead)
<span class="text-emerald-400">[✓]</span> Setting TCP MSS clamping to 1380 bytes
<span class="text-emerald-400">[✓]</span> Setting nameserver 1.1.1.1 and 1.0.0.1 in resolv.conf
<span class="text-emerald-400">[✓]</span> Starting 25s keepalive pulse daemon (PID 84192)

<span class="text-white font-bold">All optimizations activated!</span>
Run '<span class="text-tplink-cyan">tplink-cli optimize-network --revert</span>' at any time to return to system defaults.`,

  repl: `<span class="text-slate-500">$</span> <span class="text-tplink-cyan font-semibold">tplink-cli repl</span>
TP-Link Router Interactive Console v1.0.0
Type 'help' for commands, 'exit' to quit.

<span class="text-tplink-cyan font-bold">tplink (192.168.1.1)></span> signal
RSRP: -92 dBm | SINR: 14.6 dB | Band: B3 (1800MHz)

<span class="text-tplink-cyan font-bold">tplink (192.168.1.1)></span> sms list --unread
[1] From: "HUTCH" [2026-10-28 16:30]: "Your 90-Day Unlimited 20Mbps Plan is ACTIVE. Data used: 14.2 GB."

<span class="text-tplink-cyan font-bold">tplink (192.168.1.1)></span> clients
Host: dulith-thinkpad  | IP: 192.168.1.104 | MAC: 7c:10:c9:82:11:02 | Signal: -48 dBm
Host: iphone-15-pro    | IP: 192.168.1.112 | MAC: 9a:44:01:bb:ee:fa | Signal: -56 dBm`
};

function runCommand(key) {
  const screen = document.getElementById('terminal-screen');
  if (screen && terminalDemos[key]) {
    screen.innerHTML = terminalDemos[key];
  }
  document.querySelectorAll('.cmd-tab').forEach(b => {
    b.className = 'cmd-tab px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5';
  });
  const activeBtn = document.getElementById('tab-' + key);
  if (activeBtn) {
    activeBtn.className = 'cmd-tab px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-tplink-teal/20 text-tplink-cyan border border-tplink-teal/40';
  }
}

const installSnippets = {
  curl: 'curl -fsSL https://tp-link-cli.dulith.me/install.sh | bash',
  npm: 'npm install -g @dulith/tplink-cli\n# or run instantly without install:\nnpx @dulith/tplink-cli status',
  pip: 'pip install tplink-cli\n# or in isolated venv:\npipx install tplink-cli',
  brew: 'brew tap dulithdivisekara/tap\nbrew install tplink-cli',
  apt: 'curl -fsSLO https://tp-link-cli.dulith.me/tplink-cli_1.0.0_all.deb\nsudo dpkg -i tplink-cli_1.0.0_all.deb',
  go: 'go install github.com/dulithdivisekara/tplink-cli/cmd/tplink-cli@latest',
  ruby: 'gem install tplink-cli'
};

function setInstallTab(pkg) {
  document.getElementById('install-snippet').textContent = installSnippets[pkg];
  document.querySelectorAll('.inst-tab').forEach(b => {
    b.className = 'inst-tab px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-400 hover:text-white';
  });
  const active = document.getElementById('btn-' + pkg);
  if (active) {
    active.className = 'inst-tab px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-tplink-teal/20 text-tplink-cyan border border-tplink-teal/40';
  }
}

function copyHeroCmd() {
  const text = document.getElementById('hero-cmd').textContent;
  navigator.clipboard.writeText(text);
  const btn = document.getElementById('hero-copy-btn');
  btn.innerHTML = `<svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg><span class="text-emerald-400">Copied!</span>`;
  setTimeout(() => {
    btn.innerHTML = `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><span>Copy</span>`;
  }, 2000);
}

function copyInstallSnippet() {
  const text = document.getElementById('install-snippet').textContent;
  navigator.clipboard.writeText(text);
  alert('Command copied to clipboard!');
}

function filterCommands() {
  const q = (document.getElementById('cmd-search')?.value || '').toLowerCase().trim();
  document.querySelectorAll('.cmd-card').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(q) ? 'block' : 'none';
  });
}

// Default init
window.addEventListener('DOMContentLoaded', () => {
  runCommand('status');
});
