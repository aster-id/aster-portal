import { Container } from '~/lib/container'
import { Button } from '~/lib/button'
import { LockClosedIcon } from '@heroicons/react/24/solid'
import { useT } from '~/lib/i18n'

export function Hero() {
  const { t } = useT()

  return (
    <div className="hero bg-hero text-hero-foreground">
      <Container className="pt-6 md:pt-10 pb-12 mb-6 text-center lg:pt-24">
        <div className="py-1 px-4 mt-4 mb-8 md:mb-6 md:inline-block rounded-xl bg-hero-foreground/10 border-hero-foreground/20 border text-hero-foreground/80 uppercase font-bold">
          <span className="flex flex-col md:flex-row gap-x-2 justify-center-safe">
            <span>
              {t('hero.badge.nowOpen')}
              <span className="inline md:hidden">!</span>
            </span>
            <span className="hidden md:inline">&middot;</span>
            <span>{t('hero.badge.joinFuture')}</span>
          </span>
        </div>

        <h1 className="mx-auto max-w-4xl type-display text-hero-foreground">
          {t('hero.title', {
            brand(chunks) {
              return <span className="text-hero-highlight">{chunks}</span>
            },
          })}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl type-eyebrow text-hero-foreground/80">
          {t('hero.subtitle')}
        </p>
        <div className="my-6 flex justify-center gap-4 md:gap-6 flex-col md:flex-row">
          <Button route="account.create" className="py-3! px-6!" color="brand">
            {t('hero.createAccount')}
          </Button>
          <Button
            route="auth.login"
            className="py-3! px-6! text-hero-foreground! border-hero-foreground/30!"
            outline
          >
            {t('nav.signIn')}
          </Button>
        </div>
        <div className="mt-6 text-base md:text-lg text-hero-foreground/70 flex justify-center items-center gap-2">
          <LockClosedIcon className="h-6 w-6 inline-block" />
          <span>{t('hero.dataPromise')}</span>
        </div>
      </Container>
    </div>
  )
}
