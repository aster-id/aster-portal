# Aster Portal Branding Guide

This repository is a fork of [`eurosky-social/eurosky-portal`](https://github.com/eurosky-social/eurosky-portal).
This document inventories every place the upstream Eurosky branding, copy, and
infrastructure appear, so we can rebrand for **Aster** (a portal for scientists
on the AT Protocol) while keeping merges from upstream manageable.

> **Re-audit after every upstream merge.** Upstream adds branding in new places
> occasionally (e.g. PR #185 changed help links, #184 rewrote the legal docs).
> Re-run this to catch new occurrences:
>
> ```sh
> grep -rni eurosky --exclude-dir=node_modules --exclude-dir=build --exclude=CHANGELOG.md --exclude=pnpm-lock.yaml .
> ```

## Rebrand status

The mechanical rebrand to Aster (names, URLs, config, copy references) is
done, along with the **brand colors** (Aster purple `#48367a` =
`oklch(0.389 0.111 292.7)`, from `resources/images/AsterLogo.png`; lighter
lavender shades are used in dark mode via the `.dark` override in
`inertia/css/app.css`), the **navbar logos** (`inertia/images/logo-black.png` /
`logo-white.png`, both the cropped Aster badge — `#logo` CSS width is now 88px
for its 2.21:1 ratio), and the **og-image** (`resources/images/og-image.png`,
rebuilt 1200×630 from the logo). `theme-color`/`TileColor` meta tags now use
`#48367a`.

Any remaining bundled image with a **red border drawn onto it in-place** still
needs replacement with Aster artwork.

Remaining work before launch:

- [ ] Replace the remaining red-bordered images with Aster artwork (§1): the favicons/app icons in `public/icons/` (14 files; the badge artwork in `AsterLogo.png` may be reusable) and the explore walkthrough screenshots in `data/static/explore/` (4 files, show `eurosky.social` in Bluesky's UI — must be re-captured for `aster.id`)
- [ ] Write Aster's Terms of Service and Privacy Policy — the current `data/privacy_policy.md` and `data/terms_of_service.md` are Eurosky's and are **not licensed for reuse** (§8)
- [ ] Rewrite `data/faq.json` and `data/explore.md` content for Aster's audience — currently name-swapped only, still Eurosky's voice and structure (§8)
- [ ] Re-curate `data/apps.json` for a scientific audience (§8)
- [ ] Review consumer-marketing tone in `Hero.tsx`, `home.tsx`, `BetaWarning.tsx`, `dashboard/show.tsx` (§6) — currently name-swapped only
- [ ] Give the feedback links a real Aster destination (§7) — the beta banner (`BetaWarning.tsx`) and activity page previously linked to Eurosky's `userinput.app` feedback board; the links are **currently removed**, restore them once Aster has a feedback channel
- [ ] Point the sidebar Help/Contact links at real Aster destinations (§7) — currently interim `https://aster.id/`; upstream pointed them at a hosted help centre (`eurosky.tech/help/`, incl. a `#handle-invalid` deep link used by the dashboard) and a contact page (`eurosky.tech/contact/`)
- [ ] Decide whether to publish Docker images under `ghcr.io/aster-research/aster-portal` (workflows currently no-op) (§10)

### Required deployment steps

- [ ] Set `ATPROTO_HANDLE_DOMAIN=aster.id` in every deployment env (done in `service/app.env`; must also be set elsewhere the portal is deployed). Without it, bare-username login (`sebastian` → `sebastian.aster.id`) and the Aster-accounts-only login gate don't work (§9)
- [ ] Point `OAUTH_SERVICE` at the Aster PDS (`https://pds.aster.id/`, set in `service/app.env` and `.env.docker.example`) and make sure it resolves before launch — the portal is unusable without it (§9)

## Legal requirement (read first)

[`trademarks.md`](./trademarks.md) — the upstream license notice — is explicit:
the MIT license covers **code only**. Forks and deployments **must**:

- Remove all references to "Eurosky"
- Replace all logos, icons, and branding assets
- Avoid any implication of affiliation with or endorsement by Eurosky
- Use our own domains, URLs, and service identifiers
- **Not use Eurosky-operated infrastructure** (PDS instances, relays,
  AppViews, Jetstream, APIs) without authorization
- Write our own Terms of Service and Privacy Policy (theirs are *not* licensed
  for reuse — see `data/privacy_policy.md` and `data/terms_of_service.md` below)

---

## 1. Identity assets

| What | Where | Action |
| --- | --- | --- |
| Logo images (light/dark) | `inertia/images/logo-black.png`, `inertia/images/logo-white.png` | Replace in place with Aster logos (same filenames avoids CSS changes; binary files never conflict on merge) |
| Logo alt text | `inertia/components/Logo.tsx` — `<span className="invisible">Eurosky</span>` | Change to "Aster" |
| Logo CSS (size/background) | `inertia/css/app.css` — `#logo` and `.dark #logo` rules | Adjust dimensions if the Aster logo has a different aspect ratio |
| Favicons and app icons | `public/icons/*` (all sizes, `apple-icon-*`, `ms-icon-*`) | Regenerate with the Aster mark |
| PWA manifest name | `public/icons/icons_manifest.json` — `"name": "Eurosky Portal"` | Rename to "Aster Portal" |
| Open Graph image | `resources/images/og-image.png` | Replace with an Aster-branded 1200×630 image |
| Brand color | `inertia/css/app.css` — `--color-brand` / `--color-brand-border` (currently blue, `oklch(0.793 0.103 243.6)`) | Change if Aster has its own accent color (it propagates everywhere via `bg-brand`, `text-brand`, buttons, checkboxes, notices) |

## 2. HTML shell / SEO

All in `resources/views/inertia_layout.edge`:

- `@let(title = "Eurosky Portal")` — default `<title>`
- `@let(description = "Your Portal to the Atmosphere")` — default meta description
- `og:title` and `twitter:title` — hardcoded `"Eurosky Portal"` (×2)

## 3. OAuth client identity (AT Protocol)

`config/atproto_oauth.ts`:

- `client_name: 'Eurosky Portal'` — this is the name users see in the AT Proto
  OAuth consent screen ("Sign in to …"). Change to "Aster Portal".
- Consider filling in the commented-out `logo_uri` with an Aster logo URL.

Note: if `ATPROTO_OAUTH_CLIENT_ID` is set (env), the client metadata is fetched
from that URL instead, and `client_name` here is ignored — but keep them
consistent either way.

## 4. Session cookie

`config/session.ts`:

- `cookieName: 'eurosky-portal-session'` — rename (e.g.
  `aster-portal-session`). Changing this logs everyone out once, which is fine
  pre-launch.

## 5. User-facing copy — name references

"Eurosky" appears in user-visible strings in:

| File | What |
| --- | --- |
| `inertia/components/BetaWarning.tsx` | "Eurosky Portal is currently in beta." (top banner, every page) |
| `inertia/components/Hero.tsx` | Homepage H1: "Eurosky: Your Portal to the Atmosphere." |
| `inertia/pages/create-account.tsx` | "Create Your Eurosky Account." |
| `inertia/pages/login.tsx` | "Sign Into Your Eurosky Account." |
| `inertia/pages/onboarding.tsx` | "Welcome to Eurosky."; "…not use Eurosky Portal"; "Please accept the changes to continue using Eurosky Portal" |
| `inertia/pages/faq/show.tsx` | Page heading "Eurosky Portal" |
| `inertia/pages/apps/show.tsx` | "Browse featured apps that work with your Eurosky account." |
| `inertia/pages/dashboard/show.tsx` | "Eurosky is your European home on the Atmosphere…"; several "your Eurosky account works with…" strings |
| `inertia/pages/login.tsx` | Input placeholder `sebastian.eurosky.social` — should be an Aster handle example |
| `app/controllers/oauth_controller.ts` | Login error: "Currently the Eurosky portal is only available for Eurosky accounts." (×2) |

## 6. User-facing copy — tone and positioning

Aster's audience is scientists, not the mass consumer market Eurosky targets.
Beyond name swaps, these read wrong for a formal audience:

| File | What to revisit |
| --- | --- |
| `inertia/components/Hero.tsx` | "Now open!", "Join the future of the web", "One account. Dozens of apps. No lock-in.", "Create your account →" — consumer-marketing register; also `LockClosedIcon` + "Your data is yours. We will never sell it." |
| `inertia/pages/home.tsx` | "An app for everything" / "There's always new apps being created!" — exclamation-mark enthusiasm |
| `inertia/components/BetaWarning.tsx` | "Give feedback" link + banner styling — decide whether Aster shows a beta banner at all |
| `inertia/pages/dashboard/show.tsx` | "Welcome to the Atmosphere" panel frames everything around consumer social apps |
| `inertia/components/App.tsx` + `inertia/pages/apps/detail.tsx` | "Made in Europe" badge (`madeInEurope`) — Eurosky's European-positioning stamp; probably not meaningful for Aster (see §8 schema note) |
| Fonts | `inertia_layout.edge` loads Inter + IBM Plex Mono from Bunny Fonts — fine to keep, but revisit if Aster has brand typography |

## 7. External links to Eurosky properties

These must not appear on the Aster Portal (they send our users to Eurosky's
sites, and imply affiliation):

| File | Link |
| --- | --- |
| `inertia/components/layouts/authenticated.tsx` | Sidebar: `https://eurosky.tech/help/` and `https://eurosky.tech/contact/` |
| `inertia/pages/dashboard/show.tsx` | `https://eurosky.tech/help/#handle-invalid` (invalid-handle warning) |
| `inertia/components/BetaWarning.tsx` | `https://userinput.app/#/s/did:plc:…` — Eurosky's feedback board |
| `inertia/pages/activity/show.tsx` | Same `userinput.app` feedback URL |
| `data/faq.json` | "I need help" answer links to `eurosky.tech/help`, `/faq`, `/contact`, `support@eurosky.tech` |

## 8. Content data (`data/`)

Upstream occasionally edits these files, so they're the main merge-friction
area. Decide per file: adapt lightly (small conflicts) or replace wholesale
(conflict every time upstream touches it — resolve with "keep ours").

| File | Notes |
| --- | --- |
| `data/faq.json` | Entirely Eurosky-voiced ("What is the Eurosky Portal?", eurosky.tech links). Rewrite for Aster. |
| `data/explore.md` | "Explore the Atmosphere" explainer with a Bluesky-signup walkthrough using `eurosky.social` screenshots — needs an Aster version. |
| `data/static/explore/step-*.webp` | Screenshots showing `eurosky.social` in Bluesky's UI — must be re-captured for Aster's handle domain. |
| `data/apps.json` | Curated app catalog, chosen for Eurosky's mass/social audience (Flashes, mu, Skylights, …). Re-curate for scientists. Flags: `featured`, `recommended`, `madeInEurope` (the last is Eurosky positioning — see §6). |
| `data/privacy_policy.md`, `data/terms_of_service.md` | **Not licensed for reuse** (see `trademarks.md`). Must be written from scratch for Aster — entity names, `portal.eurosky.tech`, `privacy@eurosky.tech`, DPO contacts, GDPR roles, etc. |
| `data/legal.json` | Only titles/dates — probably fine as-is. |

## 9. Infrastructure endpoints

`trademarks.md` explicitly prohibits using Eurosky-operated infrastructure:

| File | What | Action |
| --- | --- | --- |
| `app/services/jetstream_service.ts` | `wss://jetstream1.eurosky.network/subscribe` — powers the activity feed | Point at our own (or a public, permitted) Jetstream instance, or disable the feature. **This is functional, not cosmetic** — it will silently consume Eurosky's infrastructure today. |
| `app/controllers/oauth_controller.ts` | `WELL_KNOWN_HANDLE_DOMAINS` includes `.eurosky.social` (domains assumed to be "not us" when resolving logins) | Remove `.eurosky.social` if Aster has its own handle domain (from `ATPROTO_HANDLE_DOMAIN`), and add Aster's |

Already env-driven, verify at deploy time (no code change):

- `OAUTH_SERVICE`, `MIGRATION_SERVICE` (the login page's migration card links
  to whatever `MIGRATION_SERVICE` is set to — upstream's points at their
  EU-HAUL tool), `ATPROTO_HANDLE_DOMAIN`, `ATPROTO_OAUTH_CLIENT_ID` —
  `start/env.ts`
- `PLAUSIBLE_ENABLED` — analytics beacon to `plausible.io`
  (`app/services/plausible_service.ts`). Consider whether third-party analytics
  is appropriate for a scientific audience, and document it in Aster's privacy
  policy if kept.
- `MONOCLE_API_KEY` — observability.

## 10. Repository metadata

| File | What |
| --- | --- |
| `package.json` | `"name": "eurosky-portal"` → `aster-portal` |
| `.changeset/config.json` | `changelog.repo` → `aster-research/aster-portal` |
| `README.md` | Title, description, `ghcr.io/eurosky-social/eurosky-portal` docker commands |
| `SECURITY.md` | Vulnerability reporting address `security@eurosky.tech` → Aster's security contact |
| `.github/workflows/publish.yaml`, `release.yaml` | Guarded by `if: github.repository == 'eurosky-social/eurosky-portal'`, so they **no-op** in our fork. Either leave as-is (simplest) or adapt to publish `ghcr.io/aster-research/aster-portal`. |
| `.vscode/settings.json` | `cSpell.words` includes "Eurosky" — add "Aster" if needed (cosmetic) |
| `.env.docker.example` | Referenced by README; check for Eurosky defaults if/when present |

## Deliberately left alone

- **`CHANGELOG.md`** — rewriting it guarantees a conflict on every upstream
  release. Leave it as upstream history.
- **`trademarks.md`** — keep as-is: it's the upstream license notice and
  documents the obligations this file tracks.
- **`atstore.fyi`** (`app/services/atstore_service.ts`) — third-party app
  directory, not Eurosky infrastructure. Fine to keep using; only our local
  curation (`data/apps.json`) is Eurosky-specific.
