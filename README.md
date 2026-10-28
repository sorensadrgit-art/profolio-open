# SOREN — Open Design Portfolio

Canonical repository: https://github.com/sorensadrgit-art/profolio-open

Soren Sadr's living résumé, interactive studies, motion films, and editable Open Design work. The current application is **Section Explorers v8**, including the newer cybernetic visuals and Biomechanical Cybernetic Lab study. Earlier v4 and v7 exports and their film-authoring sources are preserved alongside it.

## Run the current portfolio

Requires Node.js 22+ and npm.

```powershell
npm --prefix examples/soren-motion-v8 ci --ignore-scripts
npm --prefix examples/soren-motion-v8 run dev -- --port 3048 --strictPort
```

Open http://127.0.0.1:3048/. Direct section links: `#about`, `#experience`, `#education`, `#projects`, `#skills`, and `#contact`.

```powershell
npm --prefix examples/soren-motion-v8 run build
npm --prefix examples/soren-motion-v8 test
npm --prefix examples/soren-motion-v8 run preview -- --port 3049 --strictPort
```

The built site is `examples/soren-motion-v8/dist/`. Serve it over HTTP. To create a portable ZIP and checksum from that build, run `python package_distribution.py` from this repository. It writes to `artifacts/`.

## Contents

| Path | Content |
|---|---|
| [examples/soren-motion-v8](examples/soren-motion-v8/README.md) | Current editable React portfolio, local films/posters, anatomy, and project studies |
| [examples/soren-motion-v7](examples/soren-motion-v7/README.md) | Self-contained film gallery and editable Remotion/HyperFrames projects |
| [examples/soren-motion-v4](examples/soren-motion-v4/README.md) | Earlier self-contained reference-motion export |
| `motion-source/biomechanical-hero/` | Later hero composition and telemetry overlay sources |
| `artifacts/` | Tracked artwork, folios, and distribution checksum |
| `docs/attribution/` | Existing model and study attributions |
| `tests/` | Later portfolio graphics and composition checks |

The legacy artwork-generation helpers retain their original owner-specific paths. Inspect those scripts before rerendering artwork. Website playback uses the checked-in generated assets.

## Verification and provenance

See [docs/REPOSITORY-MIGRATION.md](docs/REPOSITORY-MIGRATION.md) for the transfer record, current checks, and preserved-file manifest. Historical QA reports remain with the version they originally tested.

The KineLab capture, processing, API, and clinical application belong in `sorensadrgit-art/phnoe-web-app`. This repository contains the portfolio's demonstration data, visualizations, and authoring sources.

The résumé remains draft content. Study geometry and telemetry are demonstrations; physical-device performance and clinical accuracy are unverified. Existing license notices, attribution, and reduced-motion fallbacks remain part of the portfolio.
