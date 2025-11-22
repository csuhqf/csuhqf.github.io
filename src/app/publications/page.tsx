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
                <h2 className={styles.year}>Journal Paper</h2>
                <div className={styles.paperList}>
                    <div className={styles.paper}>
                        <h3 className={styles.paperTitle}>
                            A New InSAR-Based Framework for Assessing Tailings Dam Failure Risks with the Robust Separation of Consolidation Settlements.
                        </h3>
                        <p className={styles.venue}>
                            International Journal of Applied Earth Observation and Geoinformation. (Accepted, JCR Q1, TOP Journal)
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.yearSection}>
                <h2 className={styles.year}>Patents</h2>
                <div className={styles.paperList}>
                    <div className={styles.paper}>
                        <h3 className={styles.paperTitle}>
                            A Multi-Reference Point Deformation Solution Method for Time-Series InSAR. (ZL 202510958435.5)
                        </h3>
                    </div>
                    <div className={styles.paper}>
                        <h3 className={styles.paperTitle}>
                            A Risk Assessment Method, Device, Terminal Equipment, and Medium for Tailings Dam Failure. (ZL 202411114631.6)
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
