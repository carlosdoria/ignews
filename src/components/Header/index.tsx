/* eslint-disable @next/next/no-img-element */
import { SignInButton } from '../SignInButton'
import { ActiveLink } from '../ActiveLink'
import styles from './styles.module.scss'

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
