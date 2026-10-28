# Repository correction — 28 October 2026

The Open Design portfolio belongs in `https://github.com/sorensadrgit-art/profolio-open`.

The source was `sorensadrgit-art/phnoe-web-app`, branch `feat/soren-section-explorers-v8`, commit `43cba546c3f6bb36a3518da6ab566637263929d5`. That snapshot includes the original v4/v7/v8 work and later cybernetic graphics, biomechanical studies, artwork, and hero-composition sources. Those later changes are preserved.

## Scope

Retained all portfolio versions under `examples/`, the related `motion-source/`, artwork in `artifacts/`, design/attribution documents, portfolio-only JavaScript checks, and artwork-generation helpers. Removed the photo application's capture, processing, service, viewer, Python test, and operational files from the destination working tree.

`portfolio-file-manifest.json` records the original and destination SHA-256 for every retained source file. 204 of 209 retained files are byte-identical. Intentional changes are limited to version README links, portable packaging paths, and the checksum generated from the current build. The root README and ignore rules now describe the dedicated portfolio repository.

No Git history was rewritten. Earlier branches and commits may still contain the old mixed repository layout.

## Verification

The current v8 production build and its 10 code/asset tests passed. The additional 40 existing graphics, composition, v4 controller, and v7 media checks passed. The portable distribution was rebuilt with ZIP integrity and per-file readback checks. These checks do not rerender films or establish physical-device rendering performance or clinical accuracy.

Historical QA reports remain snapshots of the version originally tested. The original 92-browser-check report predates the later cybernetic changes and is not a fresh browser acceptance claim for those changes.

The legacy artwork helpers retain original owner-specific paths. The active packaging script now uses this repository's own build and artifacts directories.

## Guidance used

Read the installed SOREN workflow and learning-loop guidance plus `agent-skills/git-workflow-and-versioning/SKILL.md`. Called the read-only SOREN router once; its motion suggestion was unrelated to repository migration and was not applied. Hindsight retrieval was unavailable. No memory, MCP configuration, or production deployment was changed.
