import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import styles from "./page.module.css";

export const metadata = {
    title: "Blog - Academic Homepage",
};

export default function Blog() {
    const allPostsData = getSortedPostsData();

    return (
        <div className={`container ${styles.container}`}>
            <h1 className={styles.title}>Blog</h1>

            <div className={styles.postList}>
                {allPostsData.map(({ slug, date, title, excerpt }) => (
                    <article key={slug} className={styles.post}>
                        <span className={styles.postDate}>{date}</span>
                        <Link href={`/blog/${slug}`}>
                            <h2 className={styles.postTitle}>{title}</h2>
                        </Link>
                        <p className={styles.postExcerpt}>{excerpt}</p>
                        <Link href={`/blog/${slug}`} className={styles.readMore}>
                            Read more →
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
