import clsx from 'clsx'
import { Heart, LucideIcon, MessageSquareText, Newspaper, UserPlus } from 'lucide-react'
import type { ActivityRow } from '#services/activity_service'
import type { SupportedCollection } from '#utils/activity'

import { Link } from '~/lib/link'
import { RelativeTime } from '~/lib/relative-time'
import { useT } from '~/lib/i18n'

const icons = {
  'app.bsky.feed.like': Heart,
  'app.bsky.feed.post': MessageSquareText,
  'app.bsky.graph.follow': UserPlus,
  'site.standard.document': Newspaper,
} satisfies Record<SupportedCollection, LucideIcon>

const labelKeys = {
  'app.bsky.feed.like': 'activity.type.like',
  'app.bsky.feed.post': 'activity.type.post',
  'app.bsky.graph.follow': 'activity.type.follow',
  'site.standard.document': 'activity.type.article',
} satisfies Record<SupportedCollection, string>

export function ActivityItem({ activity }: { activity: ActivityRow }) {
  const { collection, createdAt, text, uri } = activity
  const { t } = useT()
  const Icon = icons[collection]
  const label = t(labelKeys[collection])
  const rkey = uri.split('/').pop() ?? ''

  return (
    <li>
      <Link
        className="block w-full rounded-sm py-5 text-surface-foreground transition-colors hover:bg-surface-muted/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        route="activity.detail"
        routeParams={{ collection, rkey }}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 type-label">
            <Icon aria-hidden="true" className="size-4 shrink-0 text-brand" />
            {label}
          </span>
          <span className="type-meta shrink-0 text-surface-muted">
            <RelativeTime value={createdAt} />
          </span>
        </div>
        {text && (
          <p
            className={clsx('mt-2', {
              'type-heading-3': collection === 'site.standard.document',
              'type-meta': collection !== 'site.standard.document',
            })}
          >
            {text}
          </p>
        )}
      </Link>
    </li>
  )
}
