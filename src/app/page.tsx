import Image from "next/image";
import Link from "next/link";
import { Github, GraduationCap } from "lucide-react";
import styles from "./page.module.css";

// Custom Bilibili Icon (Simplified TV style)
const BilibiliIcon = ({ size = 32, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="6" width="18" height="14" rx="2" />
    <path d="M8 3L10 6" />
    <path d="M16 3L14 6" />
    <path d="M10 11L14 13L10 15V11Z" fill="currentColor" stroke="none" />
  </svg>
);

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image
          src="/profile.png"
          alt="Profile Picture"
          width={150}
          height={150}
          className={styles.profileImage}
          priority
        />

        <h1 className={styles.name}>Qifeng He</h1>
        <p className={styles.role}>Ph.D. Candidate | Central South University</p>

        <div className={styles.contactLinks}>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="GitHub">
            <Github size={32} />
          </a>
          <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="Google Scholar">
            <GraduationCap size={32} />
          </a>
          <a href="https://bilibili.com" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="Bilibili">
            <BilibiliIcon size={32} />
          </a>
        </div>
      </div>
    </div>
  );
}
