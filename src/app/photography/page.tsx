import Image from "next/image";
import { getPhotos } from "@/lib/photos";
import styles from "./page.module.css";

export const metadata = {
    title: "Photography - Academic Homepage",
};

export default function Photography() {
    const photos = getPhotos();

    return (
        <div className={`container ${styles.container}`}>
            <h1 className={styles.title}>Photography</h1>

            <div className={styles.grid}>
                {photos.map((photo, index) => (
                    <div key={index} className={styles.photoItem}>
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            width={600}
                            height={400}
                            className={styles.image}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className={styles.caption}>
                            <p className={styles.captionText}>{photo.alt}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
