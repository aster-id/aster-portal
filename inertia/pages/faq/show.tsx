import { ArrowDownIcon } from '@heroicons/react/24/solid'
import { Head } from '@inertiajs/react'
import MarkdownDocument from '~/components/MarkdownDocument'
import { Container } from '~/lib/container'
import { InertiaProps } from '~/types'
import { useT } from '~/lib/i18n'
import { brand } from '#shared/brand'

export default function Faq(props: InertiaProps<{ faq: { question: string; answer: string }[] }>) {
  const { tPlain, t } = useT()

  return (
    <>
      <Head title={tPlain('faq.title')} />
      <Container className="py-16 md:py-24 px-4">
        <h1 className="mb-6 type-heading-1 text-black dark:text-surface-foreground text-center">
          {t('faq.title')}
        </h1>
      </Container>
      <div className="bg-surface-canvas dark:bg-dashboard-canvas min-h-dvh-minus-35">
        <Container className="pt-5 pb-10 md:pb-24 md:pt-12 faq">
          <h2 className="text-2xl font-semibold text-ink dark:text-white mb-8">
            {brand.productTitle}
          </h2>
          {props.faq.map((entry, idx) => (
            <details
              key={idx}
              className="border border-charcoal/20 dark:border-panel-border rounded-lg mb-4 overflow-hidden hover:border-charcoal dark:hover:border-panel-border-hover transition-colors"
            >
              <summary className="flex items-center justify-between relative type-label text-ink/80 dark:text-surface-muted p-6 cursor-pointer bg-surface-subtle hover:bg-surface-canvas  dark:bg-panel dark:hover:bg-panel-hover transition-colors">
                {entry.question}
                <ArrowDownIcon className="w-6 h-6 flex text-charcoal dark:text-surface-muted transition-transform" />
              </summary>
              <MarkdownDocument
                className="p-4 bg-white text-charcoal! dark:text-surface-muted! leading-relaxed dark:bg-panel border-stone-light dark:border-panel-border border-t"
                document={entry.answer}
              />
            </details>
          ))}
        </Container>
      </div>
    </>
  )
}
