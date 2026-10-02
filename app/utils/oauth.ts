import env from '#start/env'

/**
 * Query parameters of the OAuth callback that must not end up in logs or
 * traces.
 *
 * `response` carries the code when JARM is used.
 */
const callbackParams = ['code', 'iss', 'response', 'state']

/**
 * Scope to favorite apps on atstore;
 * requested when needed.
 */
export const favoriteScope = 'repo:fyi.atstore.listing.favorite?action=create&action=delete'

/**
 * Scopes requested when logging in.
 *
 * See: https://atproto.com/guides/scopes
 */
export const loginScopes = [
  'atproto',
  'rpc:app.bsky.actor.getProfile?aud=did:web:api.bsky.app%23bsky_appview',
]

/**
 * Get the configured handle domains, each with a leading dot.
 *
 * The first one is the default, used to complete bare usernames
 * (`alice` > `alice.eurosky.social`).
 */
export function getHandleDomains(): string[] {
  const values = env.get('ATPROTO_HANDLE_DOMAIN') ?? []
  const domains = values.map((value) => {
    const domain = value.toLowerCase()
    return domain.startsWith('.') ? domain : '.' + domain
  })
  return [...new Set(domains)]
}

/**
 * Redact OAuth callback parameters in a URL, path, or bare query string.
 */
export function redactCallbackParams(value: string, isQuery = false): string {
  const index = isQuery ? -1 : value.indexOf('?')
  if (!isQuery && index === -1) return value

  const params = new URLSearchParams(value.slice(index + 1))
  let changed = false

  for (const name of callbackParams) {
    if (params.has(name)) {
      params.set(name, 'REDACTED')
      changed = true
    }
  }

  return changed ? value.slice(0, index + 1) + params.toString() : value
}
