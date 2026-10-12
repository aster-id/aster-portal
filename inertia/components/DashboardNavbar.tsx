
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '~/lib/navbar'
import { Logo } from './Logo'
import { Form } from '@adonisjs/inertia/react'
import { Button } from '~/lib/button'
import { useAuth } from '~/utils/use_auth'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'
import clsx from 'clsx'
import { INVALID_HANDLE } from '@atproto/syntax'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { useT } from '~/lib/i18n'

export default function DashboardNavbar({ className }: React.ComponentProps<'div'>) {
  const user = useAuth()
  const { tPlain, t } = useT()
  const isHandleInvalid = user.handle === INVALID_HANDLE

  return (
    <Navbar className={clsx(className, 'dashboard-navbar bg-dashboard-chrome')}>
      <a href="https://aster.place/" aria-label={tPlain('nav.home')} className="rounded-sm md:ml-6 mt-1 mb-2">
        <Logo />
      </a>
      <NavbarSpacer />
      <NavbarSection>
        {/* Handle chips = type-meta, with leading pinned to the 24px icon. */}
        <NavbarItem route="dashboard.show" className="hidden md:flex">
          {isHandleInvalid ? (
            <span className="type-meta leading-6! text-error-foreground!">
              <ExclamationTriangleIcon className="h-6 w-6 inline-block" />{' '}
              {user.handle}
            </span>
          ) : (
            <span className="type-meta leading-6! text-surface-muted!">
              @{user.handle}
            </span>
          )}
        </NavbarItem>

        <Form route="oauth.logout" className="justify-stretch hidden lg:flex">
          <Button type="submit" outline className="text-surface-foreground! border-surface-foreground/30!">
            {t('nav.logout')}
          </Button>
        </Form>
        <ThemeToggle />
        <LanguageToggle />
      </NavbarSection>
    </Navbar>
  )
}
