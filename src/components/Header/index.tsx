/* eslint-disable @next/next/no-img-element */
import { SignInButton } from 'components/SignInButton'
import styles from './styles.module.scss'

export function Header () {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <img src="/images/logo.svg" alt="ig.news" />

        <nav>
          <a className={styles.active} href="">Home</a>
          <a href="">Posts</a>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}
