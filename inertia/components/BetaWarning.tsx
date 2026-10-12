import { useT } from '~/lib/i18n'

const feedbackUrl = 'https://userinput.app/s/did:plc:ifn645rwvsuolxg7o3w7ouo4/3mxcneyrx2z22'

export default function BetaWarning() {
  const { t } = useT()

  return (
    <div className="bg-feedback py-2 px-3 text-center text-feedback-foreground font-semibold">
      {t('beta.warning', {
        feedback(chunks) {
          return (
            <a
              href={feedbackUrl}
              rel="noopener noreferrer"
              target="_blank"
              className="underline hover:text-feedback-foreground/70"
            >
              {chunks}
            </a>
          )
        },
      })}
    </div>
  )
}
