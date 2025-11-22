import styles from "./page.module.css";

export const metadata = {
    title: "About - Academic Homepage",
};

export default function About() {
    return (
        <div className={`container ${styles.container}`}>
            <h1 className={styles.title}>About Me</h1>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Contact</h2>
                <div className={styles.item}>
                    <p className={styles.itemDescription}><strong>Email:</strong> heqifeng@csu.edu.cn</p>
                    <p className={styles.itemDescription}><strong>Tel:</strong> (+86) 182-3065-6815</p>
                    <p className={styles.itemDescription}><strong>Add:</strong> Changsha, Hunan, China</p>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Education</h2>

                <div className={styles.item}>
                    <div className={styles.itemHeader}>
                        <h3 className={styles.itemTitle}>Central South University (CSU)</h3>
                        <span className={styles.itemDate}>Sep 2023 - Present</span>
                    </div>
                    <div className={styles.itemSubtitle}>Ph.D. Candidate in Surveying Science and Technology (Direct PhD Program)</div>
                    <p className={styles.itemDescription}>
                        <strong>GPA:</strong> 3.86/4.0<br />
                        <strong>Honors:</strong> "Ben-Bo" (Bachelor-Doctoral) Innovation Talent Program
                    </p>
                </div>

                <div className={styles.item}>
                    <div className={styles.itemHeader}>
                        <h3 className={styles.itemTitle}>Central South University (CSU)</h3>
                        <span className={styles.itemDate}>Sep 2019 - Jun 2023</span>
                    </div>
                    <div className={styles.itemSubtitle}>B.Eng. in Geomatics Engineering</div>
                    <p className={styles.itemDescription}>
                        <strong>Average Score:</strong> 90.16/100 (Ranked 2/User's Major Class Size)<br />
                        <strong>Honors:</strong> Outstanding Graduate of Hunan Province
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Research Experience</h2>

                <div className={styles.item}>
                    <div className={styles.itemHeader}>
                        <h3 className={styles.itemTitle}>Remote Sensing Detection Technology for Underground Space Utilization in Complex Terrains</h3>
                        <span className={styles.itemDate}>Oct 2023 - Present</span>
                    </div>
                    <div className={styles.itemSubtitle}>Core Researcher | National Key R&D Program of China (Sub-topic No. 2022YFB3903602)</div>
                    <div className={styles.itemDescription}>
                        <ul>
                            <li><strong>Overview:</strong> A comprehensive project utilizing remote sensing to monitor surface deformation in border and mining areas.</li>
                            <li><strong>Key Contributions:</strong>
                                <ul>
                                    <li>Integrated high-precision InSAR surface deformation data with multi-resolution optical remote sensing imagery and geographic information.</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
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
                    <span className={styles.skill}>InSAR</span>
                    <span className={styles.skill}>Remote Sensing</span>
                </div>
            </section>
        </div>
    );
}
