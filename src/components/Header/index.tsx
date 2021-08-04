/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { SignInButton } from 'components/SignInButton'
import styles from './styles.module.scss'

export function Header () {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <img src="/images/logo.svg" alt="ig.news" />

        <nav>
          <Link href="/">
            <a className={styles.active} >Home</a>
          </Link>
          <Link href="/">
            Posts
          </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}
