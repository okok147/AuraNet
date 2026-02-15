# AuraNet

A tiny offline-first **activity logger + aura map** (static site), plus a
research-focused myelinated axon simulation package in `src/`.

## Web App (existing)

- Activity logger: enter what you’re doing, each activity deterministically generates a unique hex color.
- Long-term aura: blends your history using repetition/recency weighting + donut chart breakdown.
- Paper sketch map: paper texture + simulated street activity.
- Privacy by default: auras are blurred/quantized for sharing; `My location` centers you precisely (local-only view).
- Visibility modes: `Everyone`, `Specific area` (10–500m), `Approved aura` (allowlist + room join UI).
- Task marketplace demo: post tasks with time + distance limits; verified workers accept; a tether line connects auras until completion.
- Firebase login (optional): sign in with Google via Firebase Auth when `web/firebase-config.js` is configured.

### Run web app locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173`.

### Web production checks

```bash
npm run check
```

## Research-Grade Myelinated Axon Simulation (new)

The Python package models saltatory conduction in repeating units of:

- **Nodes of Ranvier**: active HH-style Na/K regeneration.
- **Internodes**: passive myelinated cable segments with high Rm and low Cm.

It supports:

- baseline myelinated conduction,
- demyelination (`Rm↓`, `Cm↑`, optional exposed internodal Na conductance),
- remyelination (partial restoration and shortened internodes),
- synchrony analysis for two converging pathways with delay and phase metrics.

### Install Python dependencies

```bash
pip install -r requirements.txt
```

Minimal requirements are:

- `numpy`
- `scipy`
- `matplotlib`

Optional:

- `neuron` (for higher-fidelity backend auto-detection)

### CLI arguments

`python -m src.simulate` supports these required knobs:

- `--n_nodes`, `--internode_length_um`, `--node_length_um`, `--diameter_um`
- `--rm_myelin`, `--cm_myelin`, `--rm_node`, `--cm_node`, `--ra`
- `--demyelination_factor`, `--freq_hz_for_phase`, `--dt`, `--tstop_ms`

Additional controls include `--mode`, `--condition`, `--backend`,
`--internode_segments`, `--solver`, and output labels.

Default solver is `solve_ivp` (`BDF`) for robustness. `--solver rk4` is also
available; use small `--dt` (for example `<= 0.0005` ms) for accurate nodal
regeneration.

## Examples (one command each)

### 1) Baseline myelinated saltatory conduction (plots + velocity + energy comparison)

```bash
python -m src.simulate --mode single --condition myelinated --label baseline_myelinated --output_dir outputs
```

Outputs include:

- node/internode `Vm(t)` traces,
- `Vm(x,t)` space-time heatmap,
- conduction velocity estimate from node threshold crossings,
- Na-current energy proxy comparison against an internal demyelinated reference.

### 2) Demyelination sweep (slowing + possible block)

```bash
python -m src.simulate --mode sweep --demyelination_factor 8 --label demyelination_sweep --output_dir outputs
```

Outputs:

- velocity-vs-demyelination plot,
- final-node arrival time-vs-demyelination plot,
- JSON metrics table.

### 3) Synchrony experiment (Δd and Δφ at 10 Hz and 40 Hz, plus user frequency)

```bash
python -m src.simulate --mode synchrony --demyelination_factor 1.2 --freq_hz_for_phase 10 --label synchrony --output_dir outputs
```

Outputs:

- delay mismatch `Δd` between pathway A and pathway B,
- phase mismatch `Δφ = ω·Δd` (degrees) at 10 Hz, 40 Hz, and `--freq_hz_for_phase`,
- synchrony plot + JSON metrics.

### Optional remyelination scenario

```bash
python -m src.simulate --mode single --condition remyelinated --demyelination_factor 2 --remyelination_fraction 0.6 --label remyelinated --output_dir outputs
```

## Optional NEURON backend

Backend behavior:

- `--backend auto` (default): use NEURON if available, else pure Python.
- `--backend python`: force pure-Python compartment model.
- `--backend neuron`: force NEURON (errors if package missing).

The NEURON backend is MRG-inspired (node/internode organization with active
nodes and passive myelinated internodes) for cross-checking. The pure-Python
model remains the reference runnable path.

## Model assumptions and limitations

- SI units are used internally; CLI values in `um`, `ms`, `mV` are converted.
- Active membrane is concentrated at nodes; internodes are passive by default.
- Gating kinetics are classical HH with Q10 temperature scaling (not a full
  molecular-level nodal channel model).
- Geometry is a regular repeating chain; no branching, stochastic channel noise,
  extracellular field effects, or ephaptic coupling.
- The NEURON backend here is not a full finite-impedance double-cable
  reconstruction of every MRG sub-compartment; it is an optional high-fidelity
  check relative to the pure-Python implementation.

## Mechanistic provenance (paper-backed)

All visualized mechanisms in plots/"animation-like" heatmaps are grounded in
published studies:

- **HH active spike generation**: Hodgkin & Huxley 1952
  - [PubMed](https://pubmed.ncbi.nlm.nih.gov/12991237/)
  - DOI: `10.1113/jphysiol.1952.sp004764`
- **Myelinated node/internode modeling + MRG double-cable motivation**:
  McIntyre, Richardson, Grill 2002; Richardson et al. 2000
  - [MRG 2002 PubMed](https://pubmed.ncbi.nlm.nih.gov/11826063/), DOI: `10.1152/jn.00353.2001`
  - [Richardson 2000 PubMed](https://pubmed.ncbi.nlm.nih.gov/10984943/), DOI: `10.1007/BF02345014`
- **Demyelination slows/blocks conduction**: Waxman & Brill 1978
  - [PubMed](https://pubmed.ncbi.nlm.nih.gov/660202/)
  - DOI: `10.1136/jnnp.41.5.408`
- **Myelin increases conduction speed**: Hartline & Colman 2007
  - [PubMed](https://pubmed.ncbi.nlm.nih.gov/17208176/)
  - DOI: `10.1016/j.cub.2006.11.042`
- **Conduction-delay alignment / synchrony role of myelin**:
  Salami et al. 2003; Seidl 2014; Pajevic et al. 2014
  - [Salami 2003 PubMed](https://pubmed.ncbi.nlm.nih.gov/12719546/), DOI: `10.1073/pnas.0937380100`
  - [Seidl 2014 PubMed](https://pubmed.ncbi.nlm.nih.gov/23820043/), DOI: `10.1016/j.neuroscience.2013.06.047`
  - [Pajevic 2014 PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC4037390/), DOI: `10.3389/fncel.2014.00155`
- **Energy interpretation of Na influx proxy**:
  Alle et al. 2009; Harris & Attwell 2012
  - [Alle 2009 PubMed](https://pubmed.ncbi.nlm.nih.gov/19745156/), DOI: `10.1126/science.1174331`
  - [Harris & Attwell 2012 PubMed](https://pubmed.ncbi.nlm.nih.gov/23177956/), DOI: `10.1523/JNEUROSCI.3430-11.2012`

## Python tests

Run:

```bash
python -m unittest tests/test_basic.py
```

Tests cover:

- AP propagation across multiple nodes in baseline myelinated condition,
- conduction velocity decrease (or block) under demyelination,
- monotonic increase of pathway delay mismatch as myelin degrades.

## Existing deployment notes (web)

Pushing to `main` triggers the GitHub Pages workflow (deploys the `web/` folder).

Expected URL:
- `https://okok147.github.io/AuraNet/`
