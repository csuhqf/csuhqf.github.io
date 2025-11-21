'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, BookOpen } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    return (
        <nav className={`${styles.navbar} ${isHome ? styles.transparent : ''}`}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    <BookOpen size={24} />
                    <span>AcademicName</span>
                </Link>

                <div className={styles.desktopMenu}>
                    <Link href="/" className={styles.link}>Home</Link>
                    <Link href="/publications" className={styles.link}>Publications</Link>
                    <Link href="/blog" className={styles.link}>Blog</Link>
                    <Link href="/photography" className={styles.link}>Photography</Link>
                    <Link href="/about" className={styles.link}>About</Link>
                </div>

                <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {isOpen && (
                    <div className={styles.mobileMenu}>
                        <Link href="/" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Home</Link>
                        <Link href="/publications" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Publications</Link>
                        <Link href="/blog" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Blog</Link>
                        <Link href="/photography" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Photography</Link>
                        <Link href="/about" className={styles.mobileLink} onClick={() => setIsOpen(false)}>About</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
