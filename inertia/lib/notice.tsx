import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { ReactNode } from 'react'

type NoticeProps = {
  action?: ReactNode
  text: string
  title: string
  tone?: 'brand' | 'gold'
}

export default function Notice({ action, text, title, tone = 'brand' }: NoticeProps) {
  const gold = tone === 'gold'
  return (
    <div
      className={`rounded-md p-4 my-6 outline ${gold ? 'bg-migration-notice outline-migration-notice' : 'bg-brand/30 outline-brand/80 dark:outline-brand/75'}`}
    >
      <div className="flex">
        <div className="shrink-0">
          <ExclamationTriangleIcon
            aria-hidden="true"
            className={`size-8 ${gold ? 'text-migration-notice-foreground' : 'text-brand'}`}
          />
        </div>
        <div className="ml-3">
          <h3
            className={`text-sm font-medium ${gold ? 'text-migration-notice-foreground' : 'text-black dark:text-white'}`}
          >
            {title}
          </h3>
          <div
            className={`mt-1 text-sm ${gold ? 'text-migration-notice-muted' : 'text-black/70 dark:text-white/80'}`}
          >
            <p>{text}</p>
          </div>
          {action && <div className="mt-2 text-sm font-medium">{action}</div>}
        </div>
      </div>
    </div>
  )
}
