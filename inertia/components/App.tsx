import { Data } from '@generated/data'
import clsx from 'clsx'
import { StarIcon } from '@heroicons/react/20/solid'
import { Avatar } from '~/lib/avatar'
import { Badge } from '~/lib/badge'
import { Link } from '~/lib/link'
import { FavoriteButton } from './FavoriteButton'
import { useT } from '~/lib/i18n'
import { formatNumber } from '~/utils/number'

/** Pass `favorite` to show an independent favorite control beside the app link. */
export function App({ app, favorite }: { app: Data.AppSummary; favorite?: boolean | undefined }) {
  const { locale, t } = useT()
  const favoritable = typeof favorite === 'boolean'
  const rating = Number.parseFloat(app.listing.rating ?? '')

  return (
    <li className="relative min-w-0 border-t border-neutral-300 dark:border-panel-border">
      <Link
        className={clsx(
          'flex h-full gap-4 py-5 text-left rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand',
          favoritable && 'pr-10'
        )}
        route="discover.app"
        routeParams={{ rkey: app.rkey }}
      >
        <Avatar
          square
          src={app.listing.iconUrl}
          initials={Array.from(app.listing.name.trim())[0] ?? '?'}
          className="size-14 sm:size-16 bg-brand-700 text-neutral-100 [--avatar-radius:4px]!"
        />
        <div className="min-w-0 flex-1">
          <h4 className="type-heading-2 text-surface-foreground" lang="en">
            {app.listing.name}
          </h4>
          <p className="type-prose text-surface-muted line-clamp-2" lang="en">
            {app.listing.tagline}
          </p>
          {Number.isFinite(rating) || app.madeInEurope ? (
            <div className="type-eyebrow mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-surface-muted">
              {Number.isFinite(rating) ? (
                <span className="inline-flex items-center gap-1">
                  <StarIcon aria-hidden="true" className="size-3.5 text-warning-foreground" />
                  <span>{formatNumber(rating, locale)}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {formatNumber(app.listing.reviewCount, locale)} {t('apps.category.reviews')}
                  </span>
                </span>
              ) : undefined}
              {app.madeInEurope ? <Badge color="blue">{t('apps.madeInEurope')}</Badge> : undefined}
            </div>
          ) : undefined}
        </div>
      </Link>
      {favoritable ? (
        <FavoriteButton
          className="absolute right-1 top-5"
          compact
          favorite={favorite}
          name={app.listing.name}
          rkey={app.rkey}
        />
      ) : undefined}
    </li>
  )
}
