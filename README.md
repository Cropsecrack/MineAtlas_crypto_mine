<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>MineAtlas — README</title>
  <style>
    :root {
      color-scheme: dark;
      --bg: #090a0f;
      --panel: rgba(15, 17, 26, 0.88);
      --line: rgba(255, 255, 255, 0.1);
      --text: #f8fafc;
      --muted: #94a3b8;
      --blue: #60a5fa;
      --purple: #a78bfa;
      --amber: #fb923c;
      font-family: Inter, system-ui, -apple-system, sans-serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 48px 20px;
      background: var(--bg);
      background-image:
        radial-gradient(circle at 50% 0%, rgba(96, 165, 250, 0.15), transparent 45%),
        radial-gradient(circle at 85% 30%, rgba(251, 146, 60, 0.08), transparent 40%);
      color: var(--text);
      line-height: 1.6;
    }
    main { max-width: 860px; margin: auto; }
    h1 {
      font-size: clamp(2rem, 4vw, 3rem);
      letter-spacing: -0.04em;
      margin: 0 0 12px;
      background: linear-gradient(90deg, #f8fafc, var(--blue), var(--purple));
      -webkit-background-clip: text;
      color: transparent;
    }
    .lead { color: var(--muted); font-size: 1.05rem; margin-bottom: 32px; }
    .card {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: 24px;
      margin-bottom: 18px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }
    h2 { margin: 0 0 10px; font-size: 1.2rem; color: var(--blue); }
    ul { margin: 0; padding-left: 20px; color: #cbd5e1; }
    li { margin-bottom: 6px; }
    code {
      background: rgba(96, 165, 250, 0.14);
      color: var(--blue);
      padding: 2px 6px;
      border-radius: 6px;
      font-size: 0.88em;
    }
    .note {
      border-left: 3px solid var(--amber);
      padding-left: 14px;
      color: var(--muted);
      font-size: 0.92rem;
    }
  </style>
</head>
<body>
  <main>
    <h1>MineAtlas — Project README</h1>
    <p class="lead">
      A single-file, dark-mode mining hardware and self-custody command center for comparing ASICs,
      home solo miners, hardware wallets, and site power infrastructure.
    </p>

    <section class="card">
      <h2>1. Multi-Tab Workspace</h2>
      <ul>
        <li><strong>Overview (<code>#/overview</code>):</strong> Interactive particle/laser hero, quick-launch stat cards, and FAQ.</li>
        <li><strong>Directory (<code>#/directory</code>):</strong> 18 systems across <em>Antminers</em>, <em>Home & Other Miners</em>, <em>Air-Gapped Wallets</em>, <em>Touch & NFC Wallets</em>, and <em>Infrastructure</em> with search, sorting, and Grid/Table views.</li>
        <li><strong>Blueprints (<code>#/blueprints</code>):</strong> Setup architectures for Home Solo, Garage Multi-Rig, Hydro/Industrial, and Air-Gapped Multisig.</li>
        <li><strong>Fleet Calculator (<code>#/calculator</code>):</strong> Multi-unit wattage, electricity rate, and PUE cooling overhead modeler with a live Chart.js breakdown.</li>
        <li><strong>Facility Sim (<code>#/facility</code>):</strong> Interactive airflow and telemetry zone walkthrough (Hot Aisle, Hydro Loop, PDU Vault, Signing Room).</li>
      </ul>
    </section>

    <section class="card">
      <h2>2. Interactive Tools</h2>
      <ul>
        <li><strong>NASA 3D Telemetry Inspector:</strong> Click any product card to orbit its photo inside a Three.js wireframe cage with live yaw/pitch coordinates, wireframe, and explode toggles.</li>
        <li><strong>Comparison Matrix:</strong> Select up to 3 systems to compare specs and daily electricity costs side-by-side.</li>
        <li><strong>MineAtlas Advisor:</strong> Built-in semantic catalog & live kWh math assistant, with an optional <code>⚙</code> toggle to connect your own Gemini API key.</li>
      </ul>
    </section>

    <section class="card">
      <h2>3. How to Run</h2>
      <p class="note">
        Open <code>mineatlas.html</code> in any modern browser. No build step or backend server is required.
        All electricity calculations are estimates only and do not predict mining profitability.
      </p>
    </section>
  </main>
</body>
</html>
