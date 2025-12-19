"use client";

import { useState } from "react";
import CertificateModal from "@/components/CertificateModal";
import styles from "./page.module.css";

export default function About() {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
                <h2 className={styles.sectionTitle}>Honors & Awards</h2>
                <div className={styles.item}>
                    <ul className={styles.list}>
                        <li>
                            <span className={styles.clickableAward} onClick={() => setIsModalOpen(true)}>
                                <strong>Oral Presentation (First Prize)</strong>, 2025 International Symposium on Smart City and Disaster Risk Reduction, Xuzhou, CHINA | Dec 2025
                            </span>
                        </li>
                        <li><strong>Outstanding Graduate of Hunan Province</strong> | 2023</li>
                        <li><strong>"Jingwei Pathfinder" First Class Scholarship</strong> (Corporate Scholarship) | 2021-2022
                            <ul>
                                <li>Awarded to top students in the School of Geosciences and Info-Physics.</li>
                            </ul>
                        </li>
                        <li><strong>Special Prize</strong>, 12th National University Student Surveying and Mapping Sci-Tech Paper Competition | 2021</li>
                        <li><strong>First Prize</strong>, 6th National University Student Surveying and Mapping Skills Competition (Virtual Simulation Digital Mapping) | 2021</li>
                        <li><strong>First / Second Class Academic Scholarship of Central South University</strong> | 2020 - 2024
                            <ul>
                                <li>Awarded consecutively for academic excellence (Top 10%).</li>
                            </ul>
                        </li>
                        <li><strong>Outstanding Student / Outstanding League Member of CSU</strong> | 2020 - 2023</li>
                    </ul>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Skills</h2>
                <div className={styles.item}>
                    <ul className={styles.list}>
                        <li><strong>Programming:</strong> Python, Rust, MATLAB.</li>
                        <li><strong>Software & Tools:</strong> GAMMA/pygamma, GMT/pygmt, Surfer, ArcGIS Pro, AutoCAD, CloudCompare, Microsoft Office.</li>
                        <li><strong>Languages:</strong> English (CET-6, CET-4), Mandarin (Native).</li>
                    </ul>
                </div>
            </section>

            <CertificateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                imageSrc="/certificate_2025_smart_city.jpg"
                title="2025 International Symposium on Smart City and Disaster Risk Reduction - First Prize"
            />
        </div>
    );
}
