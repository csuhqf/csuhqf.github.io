import styles from "./page.module.css";

export const metadata = {
    title: "About - Academic Homepage",
};

export default function About() {
    return (
        <div className={`container ${styles.container}`}>
            <h1 className={styles.title}>About Me</h1>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Education</h2>

                <div className={styles.item}>
                    <div className={styles.itemHeader}>
                        <h3 className={styles.itemTitle}>Ph.D. in Computer Science</h3>
                        <span className={styles.itemDate}>2023 - Present</span>
                    </div>
                    <div className={styles.itemSubtitle}>University Name</div>
                    <p className={styles.itemDescription}>
                        Advisor: Prof. Name. Research focus: AI Agents and Web Engineering.
                    </p>
                </div>

                <div className={styles.item}>
                    <div className={styles.itemHeader}>
                        <h3 className={styles.itemTitle}>B.S. in Computer Science</h3>
                        <span className={styles.itemDate}>2019 - 2023</span>
                    </div>
                    <div className={styles.itemSubtitle}>Another University</div>
                    <p className={styles.itemDescription}>
                        Graduated with Honors. GPA: 4.0/4.0.
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Experience</h2>

                <div className={styles.item}>
                    <div className={styles.itemHeader}>
                        <h3 className={styles.itemTitle}>Research Intern</h3>
                        <span className={styles.itemDate}>Summer 2024</span>
                    </div>
                    <div className={styles.itemSubtitle}>Tech Company Research Lab</div>
                    <p className={styles.itemDescription}>
                        Worked on large language model optimization. Published 1 paper.
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Skills</h2>
                <div className={styles.skillsList}>
                    <span className={styles.skill}>Python</span>
                    <span className={styles.skill}>PyTorch</span>
                    <span className={styles.skill}>JavaScript/TypeScript</span>
                    <span className={styles.skill}>React/Next.js</span>
                    <span className={styles.skill}>C++</span>
                    <span className={styles.skill}>LaTeX</span>
                </div>
            </section>
        </div>
    );
}
