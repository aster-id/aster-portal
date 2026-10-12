import { useEffect } from 'react'
import { router } from '@inertiajs/react'
import { TriangleAlert } from 'lucide-react'
import type { GetRecordsResult } from '#services/activity_service'
import { urlFor } from '~/client'
import { ActivityList } from '~/components/ActivityList'
import { Button } from '~/lib/button'
import Card from '~/lib/card'
import { Text } from '~/lib/text'
import type { InertiaProps } from '~/types'
import { useT } from '~/lib/i18n'

const feedbackUrl = 'https://userinput.app/s/did:plc:ifn645rwvsuolxg7o3w7ouo4/3mxcneyrx2z22'

const pageSize = 20

export default function Activity(result: InertiaProps<GetRecordsResult>) {
  const { t } = useT()

  useEffect(() => {
    if (result.state !== 'syncing') return
    const timeout = setTimeout(() => router.reload(), 5_000)
    return () => clearTimeout(timeout)
  }, [result.state])

  return (
    <div className="flex flex-col gap-y-6">
      <div>
        <h1 className="type-heading-1 text-gray-900 dark:text-white">
          {t('sidebar.yourActivity')}
        </h1>
        <p aria-live="polite" className="mt-1 text-gray-500 dark:text-surface-muted" role="status">
          {result.state === 'syncing'
            ? t('dashboard.activity.syncing')
            : t('activity.showing', { count: result.activities.length, total: result.total })}
        </p>
      </div>

      <Card className="p-4 bg-warning-surface! flex flex-row gap-3">
        <TriangleAlert aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-warning-foreground" />
        <div>
          <Text className="font-semibold text-warning-foreground!">
            {t('activity.underConstruction.title')}
          </Text>
          <Text className="text-warning-foreground!">
            {t('activity.underConstruction.text')}
          </Text>
          <Text className="text-warning-foreground!">
            <a
              className="font-semibold underline hover:text-warning-foreground/80"
              href={feedbackUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t('beta.giveFeedback')}
            </a>
          </Text>
        </div>
      </Card>

      {result.state === 'syncing' ? null : result.activities.length === 0 ? (
        <p className="text-gray-500 dark:text-surface-muted">{t('activity.noRecords')}</p>
      ) : (
        <>
          <ActivityList activities={result.activities} />
          <div className="flex justify-center">
            <Button disabled={result.activities.length >= result.total} onClick={more} outline>
              {t('activity.loadMore')}
            </Button>
          </div>
        </>
      )}
    </div>
  )

  function more() {
    if (result.state !== 'ready') return
    router.get(
      urlFor('activity.show'),
      { limit: result.activities.length + pageSize, snapshot: result.snapshot },
      { only: ['activities'], preserveScroll: true, preserveState: true }
    )
  }
}
