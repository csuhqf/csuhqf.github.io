import styles from "./page.module.css";

export const metadata = {
    title: "Projects - Academic Homepage",
};

export default function Projects() {
    return (
        <div className={`container ${styles.container}`}>
            <h1 className={styles.title}>Research Experience</h1>

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
                                <li>Conducted intelligent identification of surface deformation in key border areas and drafted technical reports.</li>
                                <li>Participated in field investigations in Tibet and mining areas for deformation monitoring and geological disaster verification.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.item}>
                <div className={styles.itemHeader}>
                    <h3 className={styles.itemTitle}>MT-InSAR Deformation Solution Method Based on Multi-Reference Point Constraints</h3>
                    <span className={styles.itemDate}>Sep 2023 - Present</span>
                </div>
                <div className={styles.itemSubtitle}>Project Leader | Graduate Innovation Project (University Level and Provincial level)</div>
                <div className={styles.itemDescription}>
                    <ul>
                        <li><strong>Overview:</strong> Doctoral research focusing on improving the accuracy of Time-Series InSAR (MT-InSAR) through advanced reference point selection.</li>
                        <li><strong>Key Contributions:</strong>
                            <ul>
                                <li>Developed a semi-quantitative model for initial multi-reference point selection, transitioning from "manual experience" to "semi-automatic" screening.</li>
                                <li>Proposed an automatic selection method for multi-reference points under non-equal precision observation contexts.</li>
                                <li>Advanced the MT-InSAR time-series deformation monitoring technology by implementing multi-reference point constraints to optimize solution accuracy.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.item}>
                <div className={styles.itemHeader}>
                    <h3 className={styles.itemTitle}>Precision Meteorological Correction Model for Automated Valley Width Deformation Monitoring</h3>
                    <span className={styles.itemDate}>Jun 2021 - Jun 2022</span>
                </div>
                <div className={styles.itemSubtitle}>Project Leader | National Undergraduate Innovation Training Program (Excellent Rating)</div>
                <div className={styles.itemDescription}>
                    <ul>
                        <li><strong>Key Contributions:</strong>
                            <ul>
                                <li>Applied traditional meteorological models to correct electro-optical distance measurement errors.</li>
                                <li>Constructed an adaptive full-day trend error model using non-parametric regression to mitigate trend items in all-weather measurements.</li>
                                <li>Proposed a joint method using Robust Kalman Filter and Weighted Least Squares to process ranging data, achieving automated full-time valley width deformation monitoring.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
