'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, BookOpen } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isTop, setIsTop] = useState(true);
    const pathname = usePathname();
    const isHome = pathname === '/';

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const controlNavbar = () => {
            const currentScrollY = window.scrollY;

            // At the top (or very close), always show and be transparent
            if (currentScrollY < 10) {
                setIsVisible(true);
                setIsTop(true);
            } else {
                setIsTop(false);
                // Hide when scrolling down, show when scrolling up
                if (currentScrollY > lastScrollY) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, []);

    return (
        <nav
            className={`${styles.navbar} ${isHome && isTop ? styles.transparent : styles.solid} ${!isVisible ? styles.hidden : ''}`}
        >
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    <BookOpen size={24} />
                    <span>AcademicName</span>
                </Link>

                <div className={styles.desktopMenu}>
                    <Link href="/" className={styles.link}>Home</Link>
                    <Link href="/publications" className={styles.link}>Publications</Link>
                    <Link href="/projects" className={styles.link}>Projects</Link>
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
                        <Link href="/projects" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Projects</Link>
                        <Link href="/blog" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Blog</Link>
                        <Link href="/photography" className={styles.mobileLink} onClick={() => setIsOpen(false)}>Photography</Link>
                        <Link href="/about" className={styles.mobileLink} onClick={() => setIsOpen(false)}>About</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
