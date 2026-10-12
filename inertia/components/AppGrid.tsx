import { Data } from '@generated/data'
import { App } from '~/components/App'

/**
 * Responsive grid of app listing rows.
 *
 * Pass `favorites` (URIs of apps) to show hearts (when logged in).
 */
export function AppGrid({
  apps,
  favorites,
}: {
  apps: Data.AppSummary[]
  favorites?: ReadonlyArray<string> | undefined
}) {
  return (
    <ul
      role="list"
      className="mt-4 mb-8 grid grid-cols-1 gap-x-8 lg:gap-x-10 md:grid-cols-2"
    >
      {apps.map((app) => (
        <App
          key={app.atUri}
          app={app}
          favorite={favorites ? favorites.includes(app.atUri) : undefined}
        />
      ))}
    </ul>
  )
}
