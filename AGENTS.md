# AGENTS.md

## Security-First Default (Project Memory)
- Always take proactive steps to protect confidential information, even if not explicitly requested.
- Never commit secrets (API keys, tokens, passwords, private keys, service-account files).
- Keep `firebase-config.js` local-only and gitignored.
- Commit only `firebase-config.example.js` placeholders.
- Before every push, run a quick secret scan and stop if sensitive values are found.
- If any secret was exposed, rotate/restrict it immediately and remove it from tracked files/history in the target public repo.

## UI Quality Default (Project Memory)
- For every UI design task, target top-tier industry quality comparable to leading web designers and product architects.
- Prioritize clarity, elegance, strong visual hierarchy, and deliberate spacing.
- Choose fonts and color palettes intentionally; ensure tone consistency and readability across components.
- Avoid clutter and low-signal decoration; every visual element must serve usability and communication.
- Final UI output should meet a high professional standard before delivery.

## Code Quality Default (Project Memory)
- For every coding task, prioritize both efficiency and cleanliness.
- Keep code simple, maintainable, and performant; avoid unnecessary complexity.
- Favor clear structure, explicit naming, and small focused functions/modules.
- Validate behavior after changes and keep implementation quality at high industry standards.

## Option Feature Completeness (Project Memory)
- When adding any new option/control requested by the user, ensure the option is fully functional end-to-end.
- Verify the full path: UI control -> state update -> behavior/render effect -> persistence (if applicable).
- Do not ship option-only UI without connected behavior.

## Deployment Default (Project Memory)
- For every code/content/UI change, push committed updates to the live site by default.
- Exception: do not push only when the user explicitly says not to push yet.
- After push, verify remote branch status and report the live site/deployment status.

