# AuraNet Memory Blocks

## Mega Block: AuraNet
- block_id: PROJECT-0000
- scope: mega
- status: active
- mission: Build and ship AuraNet as a production-level aura + map + tasks + social platform.
- execution_model:
  1. Treat the full product as one mega block (PROJECT-0000).
  2. Treat each finished mission as one solved small block (SB-XXXX).
  3. Before any new task, lookup related solved blocks by tags and reuse the proven execution path.
  4. After completing a new task, append a new solved small block.
- reuse_protocol:
  - By keyword: rg -n "mission:.*<keyword>" memory.md
  - By tag: rg -n "reuse_tags:.*<tag>" memory.md
  - By commit: rg -n "commit: <sha>" memory.md

## Small Blocks (Completed / Solved)

### [SB-0001] Build paper-texture map app scaffold with Pages deploy
- status: solved
- mission: Build paper-texture map app scaffold with Pages deploy
- execution: Implemented and shipped in commit 69498a2.
- commit: 69498a2
- reuse_tags: [uiux, map, deploy]

### [SB-0002] Fix Pages deploy: auto-enable GitHub Pages
- status: solved
- mission: Fix Pages deploy: auto-enable GitHub Pages
- execution: Implemented and shipped in commit 3e6a1a1.
- commit: 3e6a1a1
- reuse_tags: [stability, deploy]

### [SB-0003] Trigger Pages deploy
- status: solved
- mission: Trigger Pages deploy
- execution: Implemented and shipped in commit 8e1f076.
- commit: 8e1f076
- reuse_tags: [deploy]

### [SB-0004] Initial AuraNet app
- status: solved
- mission: Initial AuraNet app
- execution: Implemented and shipped in commit 83167e9.
- commit: 83167e9
- reuse_tags: [aura]

### [SB-0005] Merge upstream main
- status: solved
- mission: Merge upstream main
- execution: Implemented and shipped in commit cee2b35.
- commit: cee2b35
- reuse_tags: [general]

### [SB-0006] Bloomberg terminal style (warm light theme)
- status: solved
- mission: Bloomberg terminal style (warm light theme)
- execution: Implemented and shipped in commit 20575d7.
- commit: 20575d7
- reuse_tags: [uiux]

### [SB-0007] Add paper sketch map
- status: solved
- mission: Add paper sketch map
- execution: Implemented and shipped in commit ee21a4b.
- commit: ee21a4b
- reuse_tags: [uiux, map]

### [SB-0008] Show user location on map
- status: solved
- mission: Show user location on map
- execution: Implemented and shipped in commit 458566b.
- commit: 458566b
- reuse_tags: [map]

### [SB-0009] Add moving dot simulation on map
- status: solved
- mission: Add moving dot simulation on map
- execution: Implemented and shipped in commit 0abe025.
- commit: 0abe025
- reuse_tags: [map, aura]

### [SB-0010] Fix and improve moving dot simulation
- status: solved
- mission: Fix and improve moving dot simulation
- execution: Implemented and shipped in commit 36f2bf1.
- commit: 36f2bf1
- reuse_tags: [stability, aura]

### [SB-0011] Street-based activity dot simulation
- status: solved
- mission: Street-based activity dot simulation
- execution: Implemented and shipped in commit 81db620.
- commit: 81db620
- reuse_tags: [map, aura]

### [SB-0012] Phase 1: visibility matrix + policy evaluator
- status: solved
- mission: Phase 1: visibility matrix + policy evaluator
- execution: Implemented and shipped in commit 0580555.
- commit: 0580555
- reuse_tags: [policy]

### [SB-0013] Aura-only map sim with zoom density
- status: solved
- mission: Aura-only map sim with zoom density
- execution: Implemented and shipped in commit d1a9fc4.
- commit: d1a9fc4
- reuse_tags: [map, aura]

### [SB-0014] Replace focus timer with activity logger + aura blending
- status: solved
- mission: Replace focus timer with activity logger + aura blending
- execution: Implemented and shipped in commit 1e94ca0.
- commit: 1e94ca0
- reuse_tags: [aura]

### [SB-0015] Remove task board; add aura composition donut
- status: solved
- mission: Remove task board; add aura composition donut
- execution: Implemented and shipped in commit d9a8495.
- commit: d9a8495
- reuse_tags: [aura, marketplace]

### [SB-0016] Privacy: aura-only user location (no accuracy circle)
- status: solved
- mission: Privacy: aura-only user location (no accuracy circle)
- execution: Implemented and shipped in commit 5aef8c7.
- commit: 5aef8c7
- reuse_tags: [map, aura, deploy]

### [SB-0017] Add i18n + aura popups + post-log map aura
- status: solved
- mission: Add i18n + aura popups + post-log map aura
- execution: Implemented and shipped in commit 4a1138b.
- commit: 4a1138b
- reuse_tags: [map, aura]

### [SB-0018] Fix My Location: center on precise self aura
- status: solved
- mission: Fix My Location: center on precise self aura
- execution: Implemented and shipped in commit a0ff37e.
- commit: a0ff37e
- reuse_tags: [stability, map, aura, deploy]

### [SB-0019] Activity colors: unique hex per activity + similar suggestions
- status: solved
- mission: Activity colors: unique hex per activity + similar suggestions
- execution: Implemented and shipped in commit bfe1b98.
- commit: bfe1b98
- reuse_tags: [aura]

### [SB-0020] Add idle aura broadcast + visibility modes
- status: solved
- mission: Add idle aura broadcast + visibility modes
- execution: Implemented and shipped in commit 35f3ad4.
- commit: 35f3ad4
- reuse_tags: [aura, policy]

### [SB-0021] Polish visibility UI for mobile
- status: solved
- mission: Polish visibility UI for mobile
- execution: Implemented and shipped in commit 744ab76.
- commit: 744ab76
- reuse_tags: [uiux, policy]

### [SB-0022] Remove sim toggle UI; keep simulation always-on
- status: solved
- mission: Remove sim toggle UI; keep simulation always-on
- execution: Implemented and shipped in commit 7800b77.
- commit: 7800b77
- reuse_tags: [uiux, aura]

### [SB-0023] Sim aura decay + activity dialogs
- status: solved
- mission: Sim aura decay + activity dialogs
- execution: Implemented and shipped in commit ca0e6f5.
- commit: ca0e6f5
- reuse_tags: [aura]

### [SB-0024] Update visibility radius, room join, and aura decay
- status: solved
- mission: Update visibility radius, room join, and aura decay
- execution: Implemented and shipped in commit adcf3a1.
- commit: adcf3a1
- reuse_tags: [aura, marketplace, policy]

### [SB-0025] Improve mobile header layout and move sim labels above aura
- status: solved
- mission: Improve mobile header layout and move sim labels above aura
- execution: Implemented and shipped in commit 560c35d.
- commit: 560c35d
- reuse_tags: [uiux, aura]

### [SB-0026] Add aura map activity logger and task tether demo
- status: solved
- mission: Add aura map activity logger and task tether demo
- execution: Implemented and shipped in commit cc31f5b.
- commit: cc31f5b
- reuse_tags: [map, aura, marketplace]

### [SB-0027] Add task offers list and conversation room
- status: solved
- mission: Add task offers list and conversation room
- execution: Implemented and shipped in commit 57a15a0.
- commit: 57a15a0
- reuse_tags: [marketplace]

### [SB-0028] Color verified aura border from aura hue
- status: solved
- mission: Color verified aura border from aura hue
- execution: Implemented and shipped in commit 2ce3534.
- commit: 2ce3534
- reuse_tags: [aura]

### [SB-0029] Add marketplace tabs, scheduled auras, market posts, and task route picking
- status: solved
- mission: Add marketplace tabs, scheduled auras, market posts, and task route picking
- execution: Implemented and shipped in commit f1c44a7.
- commit: f1c44a7
- reuse_tags: [map, aura, marketplace]

### [SB-0030] Polish UI: global toast, map pick HUD, better tabs, GPS fallback
- status: solved
- mission: Polish UI: global toast, map pick HUD, better tabs, GPS fallback
- execution: Implemented and shipped in commit 7a28b34.
- commit: 7a28b34
- reuse_tags: [uiux, map]

### [SB-0031] Fix aura legend overflow; tint rows; keep percentages visible
- status: solved
- mission: Fix aura legend overflow; tint rows; keep percentages visible
- execution: Implemented and shipped in commit 6b54cf6.
- commit: 6b54cf6
- reuse_tags: [stability, aura]

### [SB-0032] Fix sticky left panel scroll so aura legend is reachable
- status: solved
- mission: Fix sticky left panel scroll so aura legend is reachable
- execution: Implemented and shipped in commit a1f4b47.
- commit: a1f4b47
- reuse_tags: [stability, aura]

### [SB-0033] Make marketplace post/list sections collapsible dropdowns
- status: solved
- mission: Make marketplace post/list sections collapsible dropdowns
- execution: Implemented and shipped in commit 9b9f880.
- commit: 9b9f880
- reuse_tags: [marketplace]

### [SB-0034] Polish marketplace tab UI
- status: solved
- mission: Polish marketplace tab UI
- execution: Implemented and shipped in commit 6b79e59.
- commit: 6b79e59
- reuse_tags: [uiux, marketplace]

### [SB-0035] Refactor shell UI and add PWA backup essentials
- status: solved
- mission: Refactor shell UI and add PWA backup essentials
- execution: Implemented and shipped in commit 0ea233e.
- commit: 0ea233e
- reuse_tags: [uiux, auth-data, deploy]

### [SB-0036] Optimize state persistence and aura computation paths
- status: solved
- mission: Optimize state persistence and aura computation paths
- execution: Implemented and shipped in commit 0a7f046.
- commit: 0a7f046
- reuse_tags: [aura]

### [SB-0037] Add Google sign-in with local config template
- status: solved
- mission: Add Google sign-in with local config template
- execution: Implemented and shipped in commit c31a7f1.
- commit: c31a7f1
- reuse_tags: [auth-data]

### [SB-0038] feat: enable firebase google authentication
- status: solved
- mission: feat: enable firebase google authentication
- execution: Implemented and shipped in commit 9d23fc9.
- commit: 9d23fc9
- reuse_tags: [auth-data]

### [SB-0039] ci: inject firebase config for pages deploy
- status: solved
- mission: ci: inject firebase config for pages deploy
- execution: Implemented and shipped in commit b2e83cc.
- commit: b2e83cc
- reuse_tags: [auth-data, deploy]

### [SB-0040] feat: store app data per authenticated user profile
- status: solved
- mission: feat: store app data per authenticated user profile
- execution: Implemented and shipped in commit 37c1a5b.
- commit: 37c1a5b
- reuse_tags: [auth-data]

### [SB-0041] feat: add map layer filters for people events and services
- status: solved
- mission: feat: add map layer filters for people events and services
- execution: Implemented and shipped in commit 9453ae8.
- commit: 9453ae8
- reuse_tags: [map, marketplace]

### [SB-0042] Enhance map pick flow with smooth jump and UI motion polish
- status: solved
- mission: Enhance map pick flow with smooth jump and UI motion polish
- execution: Implemented and shipped in commit e66d47d.
- commit: e66d47d
- reuse_tags: [uiux, map]

### [SB-0043] Production hardening: UX terminology, resilient routing, PWA cache, and quality gates
- status: solved
- mission: Production hardening: UX terminology, resilient routing, PWA cache, and quality gates
- execution: Implemented and shipped in commit f43a3e8.
- commit: f43a3e8
- reuse_tags: [stability, uiux, deploy]

### [SB-0044] Restrict task room popup to accepted participants and collapse tabs by default
- status: solved
- mission: Restrict task room popup to accepted participants and collapse tabs by default
- execution: Implemented and shipped in commit b0a27ae.
- commit: b0a27ae
- reuse_tags: [marketplace, deploy]

### [SB-0045] Upgrade UX with quick actions, onboarding, and list filters
- status: solved
- mission: Upgrade UX with quick actions, onboarding, and list filters
- execution: Implemented and shipped in commit da7eea9.
- commit: da7eea9
- reuse_tags: [uiux]

### [SB-0046] Refine aura LOD, strict growth curve, and movement declutter
- status: solved
- mission: Refine aura LOD, strict growth curve, and movement declutter
- execution: Implemented and shipped in commit 6f5a100.
- commit: 6f5a100
- reuse_tags: [aura]

### [SB-0047] Redesign UI theme and polish section-focused UX
- status: solved
- mission: Redesign UI theme and polish section-focused UX
- execution: Implemented and shipped in commit 33cdd0d.
- commit: 33cdd0d
- reuse_tags: [uiux]

### [SB-0048] Fix task accepted popup to only notify on real user actions
- status: solved
- mission: Fix task accepted popup to only notify on real user actions
- execution: Implemented and shipped in commit 944cc17.
- commit: 944cc17
- reuse_tags: [stability, marketplace]

### [SB-0049] Fix self aura visibility when show-aura is enabled
- status: solved
- mission: Fix self aura visibility when show-aura is enabled
- execution: Implemented and shipped in commit 11bd8bf.
- commit: 11bd8bf
- reuse_tags: [stability, aura, policy]

### [SB-0050] Add timed fade-out for expired tasks and activity logs
- status: solved
- mission: Add timed fade-out for expired tasks and activity logs
- execution: Implemented and shipped in commit 3956387.
- commit: 3956387
- reuse_tags: [aura, marketplace]

### [SB-0051] Apply pixel arcade theme and gaming UI refresh
- status: solved
- mission: Apply pixel arcade theme and gaming UI refresh
- execution: Implemented and shipped in commit 80e0244.
- commit: 80e0244
- reuse_tags: [uiux]

### [SB-0052] Fix persistent aura popups and add map messaging
- status: solved
- mission: Fix persistent aura popups and add map messaging
- execution: Implemented and shipped in commit 92e950a.
- commit: 92e950a
- reuse_tags: [stability, map, aura]

### [SB-0053] Add pixel-art UI decorations and responsive sprite stage
- status: solved
- mission: Add pixel-art UI decorations and responsive sprite stage
- execution: Implemented and shipped in commit 2b2c783.
- commit: 2b2c783
- reuse_tags: [uiux]

### [SB-0054] Add Google cloud backup for import/export via Firestore
- status: solved
- mission: Add Google cloud backup for import/export via Firestore
- execution: Implemented and shipped in commit 7500e7d.
- commit: 7500e7d
- reuse_tags: [stability, auth-data]

### [SB-0055] Implement attention-focused single-object workflow UI
- status: solved
- mission: Implement attention-focused single-object workflow UI
- execution: Implemented and shipped in commit cc01405.
- commit: cc01405
- reuse_tags: [uiux]

### [SB-0056] Redesign UI to book manuscript theme with sketch aura chart
- status: solved
- mission: Redesign UI to book manuscript theme with sketch aura chart
- execution: Implemented and shipped in commit 1a7cb10.
- commit: 1a7cb10
- reuse_tags: [uiux, aura]

### [SB-0057] Add ASCII paper texture overlays across UI and map
- status: solved
- mission: Add ASCII paper texture overlays across UI and map
- execution: Implemented and shipped in commit 1b3bb73.
- commit: 1b3bb73
- reuse_tags: [uiux, map, deploy]

### [SB-0058] Switch book UI to monochrome white paper and black text
- status: solved
- mission: Switch book UI to monochrome white paper and black text
- execution: Implemented and shipped in commit 05d6731.
- commit: 05d6731
- reuse_tags: [uiux]

### [SB-0059] Restore Apple-style clean UI and readable typography
- status: solved
- mission: Restore Apple-style clean UI and readable typography
- execution: Implemented and shipped in commit 03e8f57.
- commit: 03e8f57
- reuse_tags: [stability, uiux]

### [SB-0060] Render map with watercolor paper texture style
- status: solved
- mission: Render map with watercolor paper texture style
- execution: Implemented and shipped in commit b3bdbfa.
- commit: b3bdbfa
- reuse_tags: [uiux, map]

### [SB-0061] Harden GPS flow with fallback fixes and auto-retry watch
- status: solved
- mission: Harden GPS flow with fallback fixes and auto-retry watch
- execution: Implemented and shipped in commit 24107f3.
- commit: 24107f3
- reuse_tags: [stability, map]

### [SB-0062] Restore previous paper-style UI theme
- status: solved
- mission: Restore previous paper-style UI theme
- execution: Implemented and shipped in commit 7ff7faa.
- commit: 7ff7faa
- reuse_tags: [stability, uiux]

### [SB-0063] Polish UI and fix map controls interaction; remove ASCII textures
- status: solved
- mission: Polish UI and fix map controls interaction; remove ASCII textures
- execution: Implemented and shipped in commit 197c1dc.
- commit: 197c1dc
- reuse_tags: [stability, uiux, map, deploy]

### [SB-0064] Restore stable UI shell and fix map control interactivity
- status: solved
- mission: Restore stable UI shell and fix map control interactivity
- execution: Implemented and shipped in commit ca7e903.
- commit: ca7e903
- reuse_tags: [stability, uiux, map, aura]

### [SB-0065] Rollback app to yesterday snapshot (da7eea9)
- status: solved
- mission: Rollback app to yesterday snapshot (da7eea9)
- execution: Implemented and shipped in commit 10cf4cd.
- commit: 10cf4cd
- reuse_tags: [stability]

### [SB-0066] Fix self aura visibility and decouple from people layer filter
- status: solved
- mission: Fix self aura visibility and decouple from people layer filter
- execution: Implemented and shipped in commit 2c818ab.
- commit: 2c818ab
- reuse_tags: [stability, aura, policy]

### [SB-0067] Hide moving/resting simulation dialogs on map
- status: solved
- mission: Hide moving/resting simulation dialogs on map
- execution: Implemented and shipped in commit dfa629e.
- commit: dfa629e
- reuse_tags: [map, aura]

### [SB-0068] Restore aura click popup and add message/friend actions
- status: solved
- mission: Restore aura click popup and add message/friend actions
- execution: Implemented and shipped in commit ae05c6b.
- commit: ae05c6b
- reuse_tags: [stability, aura, social]

### [SB-0069] Improve aura click hit detection and popup stability
- status: solved
- mission: Improve aura click hit detection and popup stability
- execution: Implemented and shipped in commit b5aaa04.
- commit: b5aaa04
- reuse_tags: [aura]

### [SB-0070] Add interactive myelin sheath animation webpage
- status: solved
- mission: Add interactive myelin sheath animation webpage
- execution: Implemented and shipped in commit 7d1e7d7.
- commit: 7d1e7d7
- reuse_tags: [general]

### [SB-0071] Upgrade myelin page with biological practice simulator
- status: solved
- mission: Upgrade myelin page with biological practice simulator
- execution: Implemented and shipped in commit e2b515a.
- commit: e2b515a
- reuse_tags: [general]

### [SB-0072] Add paper-backed myelinated axon simulation toolkit
- status: solved
- mission: Add paper-backed myelinated axon simulation toolkit
- execution: Implemented and shipped in commit 9c54472.
- commit: 9c54472
- reuse_tags: [uiux, aura]

### [SB-0073] Add aura block flow and robust map click fallback
- status: solved
- mission: Add aura block flow and robust map click fallback
- execution: Implemented and shipped in commit 842b905.
- commit: 842b905
- reuse_tags: [map, aura, social]

### [SB-0074] Fix aura popup reliability and social state normalization
- status: solved
- mission: Fix aura popup reliability and social state normalization
- execution: Implemented and shipped in commit 75b26da.
- commit: 75b26da
- reuse_tags: [stability, aura, deploy]

### [SB-0075] Bust SW cache and improve aura tap fallback
- status: solved
- mission: Bust SW cache and improve aura tap fallback
- execution: Implemented and shipped in commit 2bca455.
- commit: 2bca455
- reuse_tags: [aura, deploy]

### [SB-0076] Stabilize first-load map routing and aura click hit layers
- status: solved
- mission: Stabilize first-load map routing and aura click hit layers
- execution: Implemented and shipped in commit 59f7810.
- commit: 59f7810
- reuse_tags: [stability, map, aura]

### [SB-0077] Harden first-load route fallback and pointer-based aura selection
- status: solved
- mission: Harden first-load route fallback and pointer-based aura selection
- execution: Implemented and shipped in commit 5c8c595.
- commit: 5c8c595
- reuse_tags: [stability, map, aura]

### [SB-0078] Rebuild aura interaction with marker tap targets
- status: solved
- mission: Rebuild aura interaction with marker tap targets
- execution: Implemented and shipped in commit 59e4760.
- commit: 59e4760
- reuse_tags: [uiux, aura]

### [SB-0079] Rebuild map aura selection hit-targets for moving agents
- status: solved
- mission: Rebuild map aura selection hit-targets for moving agents
- execution: Implemented and shipped in commit 278345f.
- commit: 278345f
- reuse_tags: [uiux, map, aura]

### [SB-0080] Add floating inbox chatbox and stabilize aura popup position
- status: solved
- mission: Add floating inbox chatbox and stabilize aura popup position
- execution: Implemented and shipped in commit 088ae5d.
- commit: 088ae5d
- reuse_tags: [stability, aura, social]

### [SB-0081] Fix inbox default-closed and reliable open-close behavior
- status: solved
- mission: Fix inbox default-closed and reliable open-close behavior
- execution: Implemented and shipped in commit a111a9d.
- commit: a111a9d
- reuse_tags: [stability, social]

### [SB-0082] Refactor inbox interaction model and polish chat UX
- status: solved
- mission: Refactor inbox interaction model and polish chat UX
- execution: Implemented and shipped in commit 3a1fbb7.
- commit: 3a1fbb7
- reuse_tags: [uiux, social]

### [SB-0083] Add command palette and fast workflow shortcuts
- status: solved
- mission: Add command palette and fast workflow shortcuts
- execution: Implemented and shipped in commit b419fd8.
- commit: b419fd8
- reuse_tags: [uiux, map, marketplace, social]

### [SB-0084] Optimize render scheduling and harden map bootstrap on first load
- status: solved
- mission: Reduce UI render churn and improve first-load map reliability
- execution: Implemented and shipped in commit de44a7c.
- commit: de44a7c
- reuse_tags: [performance, stability, map, uiux]

### [SB-0085] Tailark-style UI system refresh
- status: solved
- mission: Research Tailark UI direction and restyle AuraNet to match
- execution: Implemented and shipped in commit dc7a0ee.
- commit: dc7a0ee
- reuse_tags: [uiux, design-system, frontend]

### [SB-0086] Stabilize aura popup size and close accessibility
- status: solved
- mission: Ensure clicked aura components popup stays usable and closable without zoom adjustment
- execution: Implemented and shipped in commit f020514.
- commit: f020514
- reuse_tags: [stability, map, uiux]

### [SB-0087] Restore original warm color tuning
- status: solved
- mission: Roll back Tailark cool palette to the project's original warm color theme
- execution: Implemented and shipped in commit efff4e3.
- commit: efff4e3
- reuse_tags: [uiux, theme, rollback]
