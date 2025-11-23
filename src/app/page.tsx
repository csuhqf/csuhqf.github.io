import Image from "next/image";
import Link from "next/link";
import { Github, GraduationCap, Mail, BookOpen } from "lucide-react";
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

        {/* Hero Section */}
        <section className={styles.heroSection}>
          <Image
            src="/head.jpg"
            alt="Qifeng He"
            width={160}
            height={160}
            className={styles.profileImage}
            priority
          />
          <h1 className={styles.name}>Qifeng He</h1>
          <p className={styles.role}>Ph.D. Candidate | Central South University</p>
          <p className={styles.bio}>
            Specializing in InSAR and remote sensing technologies.
            Dedicated to monitoring ground deformation and geohazards to advance
            safety and understanding of our changing environment.
          </p>
        </section>

        {/* Research Interests */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Research Interests</h2>
          <div className={styles.interestsList}>
            <span className={styles.interestTag}>InSAR</span>
            <span className={styles.interestTag}>Remote Sensing</span>
            <span className={styles.interestTag}>Geohazards</span>
            <span className={styles.interestTag}>Time-Series Analysis</span>
            <span className={styles.interestTag}>Deformation Monitoring</span>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className={styles.section}>
          <div className={styles.ctaContainer}>
            <Link href="/projects" className={`${styles.ctaButton} ${styles.primaryBtn}`}>
              View Projects
            </Link>
            <Link href="/publications" className={`${styles.ctaButton} ${styles.secondaryBtn}`}>
              Publications
            </Link>
            <Link href="/blog" className={`${styles.ctaButton} ${styles.secondaryBtn}`}>
              Read Blog
            </Link>
          </div>
        </section>

        {/* Social Links */}
        <div className={styles.contactLinks}>
          <a href="mailto:heqifeng@csu.edu.cn" className={styles.iconLink} aria-label="Email">
            <Mail size={28} />
          </a>
          <a href="https://scholar.google.com/citations?user=1wLPNNUAAAAJ&hl=zh-CN" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="Google Scholar">
            <GraduationCap size={28} />
          </a>
          <a href="https://github.com/csuhqf" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="GitHub">
            <Github size={28} />
          </a>
          <a href="https://www.cnblogs.com/heqifeng" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="Blog">
            <BookOpen size={28} />
          </a>
          <a href="https://space.bilibili.com/434466317" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="Bilibili">
            <BilibiliIcon size={28} />
          </a>
        </div>

      </div>
    </div>
  );
}
