import Image from 'next/image';
import Logo from '../../../public/Logo.svg';
import styles from './header.module.scss'

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <Image src={Logo} alt="Logo" width="100%" height="100%" />
    </div>
  )
}
