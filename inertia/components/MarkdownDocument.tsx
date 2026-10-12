import clsx from 'clsx'

export default function MarkdownDocument({
  className,
  document,
  lang,
}: { document: string } & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx('markdown-document dark:text-surface-foreground text-grey-800', className)}
      dangerouslySetInnerHTML={{ __html: document }}
      lang={lang}
    />
  )
}
