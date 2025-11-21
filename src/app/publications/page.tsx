import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
    title: "Publications - Academic Homepage",
};

export default function Publications() {
    return (
        <div className={`container ${styles.container}`}>
            <h1 className={styles.title}>Publications</h1>

            <div className={styles.yearSection}>
                <h2 className={styles.year}>2025</h2>
                <div className={styles.paperList}>
                    <div className={styles.paper}>
                        <h3 className={styles.paperTitle}>
                            Deep Learning for Academic Website Generation
                        </h3>
                        <p className={styles.authors}>
                            <strong>Your Name</strong>, Jane Doe, John Smith
                        </p>
                        <p className={styles.venue}>
                            Proceedings of the International Conference on Web Engineering (ICWE 2025)
                        </p>
                        <div className={styles.links}>
                            <Link href="#" className={styles.link}>PDF</Link>
                            <Link href="#" className={styles.link}>Code</Link>
                            <Link href="#" className={styles.link}>BibTeX</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.yearSection}>
                <h2 className={styles.year}>2024</h2>
                <div className={styles.paperList}>
                    <div className={styles.paper}>
                        <h3 className={styles.paperTitle}>
                            Optimizing Static Site Generation for Research Portfolios
                        </h3>
                        <p className={styles.authors}>
                            John Smith, <strong>Your Name</strong>
                        </p>
                        <p className={styles.venue}>
                            Journal of Open Source Software (JOSS)
                        </p>
                        <div className={styles.links}>
                            <Link href="#" className={styles.link}>PDF</Link>
                            <Link href="#" className={styles.link}>Project Page</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
