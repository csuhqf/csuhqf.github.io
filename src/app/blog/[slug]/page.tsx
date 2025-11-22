import Link from "next/link";
import { getAllPostSlugs, getPostData } from "@/lib/posts";
import styles from "./page.module.css";

export async function generateStaticParams() {
    const paths = getAllPostSlugs();
    return paths.map((path) => ({
        slug: path.params.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug: encodedSlug } = await params;
    const slug = decodeURIComponent(encodedSlug);
    const postData = await getPostData(slug);
    return {
        title: `${postData.title} - Academic Homepage`,
    };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const { slug: encodedSlug } = await params;
    const slug = decodeURIComponent(encodedSlug);
    const postData = await getPostData(slug);

    return (
        <div className={`container ${styles.container}`}>
            <header className={styles.header}>
                <h1 className={styles.title}>{postData.title}</h1>
                <div className={styles.date}>{postData.date}</div>
            </header>

            <article
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }}
            />

            <Link href="/blog" className={styles.backLink}>
                ← Back to Blog
            </Link>
        </div>
    );
}
