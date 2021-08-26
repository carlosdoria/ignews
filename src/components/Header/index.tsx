/* eslint-disable @next/next/no-img-element */
import { SignInButton } from 'components/SignInButton'
import styles from './styles.module.scss'
import { ActiveLink } from 'components/ActiveLink'

export function Header () {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <ActiveLink href="/" activeClassName={styles.active} >
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}
