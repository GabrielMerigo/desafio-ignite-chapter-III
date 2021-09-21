import { ReactElement } from 'react';
import Link from 'next/link';

import styles from './header.module.scss';

export default function Header(): ReactElement {
  return (
    <header className={styles.container}>
      <nav className={styles.content}>
        <Link href="/">
          <a>
            <img src="/logo.svg" alt="logo" />
          </a>
        </Link>
      </nav>
    </header>
  );
}