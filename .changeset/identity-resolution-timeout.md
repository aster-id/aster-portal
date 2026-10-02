---
'eurosky-portal': patch
---

Fix logins with custom handles timing out, by allowing 5 seconds instead of 1
to resolve an identity. Configurable with `ATPROTO_RESOLVE_TIMEOUT`
(milliseconds).
