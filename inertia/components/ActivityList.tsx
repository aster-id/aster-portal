import type { ActivityRow } from '#services/activity_service'
import { ActivityItem } from '~/components/ActivityItem'

export function ActivityList({ activities }: { activities: Array<ActivityRow> }) {
  return (
    <ul role="list" className="flex flex-col border-y border-neutral-300 divide-y divide-neutral-300 dark:border-panel-border dark:divide-panel-border">
      {activities.map((activity) => (
        <ActivityItem activity={activity} key={activity.uri} />
      ))}
    </ul>
  )
}
