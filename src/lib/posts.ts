import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
    slug: string;
    title: string;
    date: string;
    excerpt?: string;
    contentHtml?: string;
    [key: string]: any;
}

export function getSortedPostsData(): PostData[] {
    // Get file names under /posts
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map((fileName) => {
            // Remove ".md" from file name to get slug (use original filename, not encoded)
            const slug = fileName.replace(/\.md$/, '');

            // Read markdown file as string
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            // Use gray-matter to parse the post metadata section
            const matterResult = matter(fileContents);

            let title = matterResult.data.title;
            let date = matterResult.data.date;
            let excerpt = matterResult.data.excerpt;

            // Fallback for title: extract from first H1
            if (!title) {
                const titleMatch = matterResult.content.match(/^#\s+(.*)/m);
                if (titleMatch) {
                    title = titleMatch[1];
                } else {
                    title = slug; // Fallback to slug
                }
            }

            // Fallback for date: use file modification time
            if (!date) {
                const stats = fs.statSync(fullPath);
                date = stats.mtime.toISOString().split('T')[0];
            }

            // Fallback for excerpt: first 150 chars of content (stripping title and markdown)
            if (!excerpt) {
                const contentBody = matterResult.content.replace(/^#\s+.*\n/, '').trim();
                excerpt = stripMarkdown(contentBody).slice(0, 150) + '...';
            }

            // Combine the data with the id
            return {
                slug,
                title,
                date,
                excerpt,
                ...matterResult.data,
            };
        });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

function stripMarkdown(text: string): string {
    return text
        .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
        .replace(/#{1,6}\s+/g, '') // Remove headers
        .replace(/(\*\*|__)(.*?)\1/g, '$2') // Remove bold
        .replace(/(\*|_)(.*?)\1/g, '$2') // Remove italic
        .replace(/`{3}[\s\S]*?`{3}/g, '') // Remove code blocks
        .replace(/`(.+?)`/g, '$1') // Remove inline code
        .replace(/>\s+/g, '') // Remove blockquotes
        .replace(/^\s*[-+*]\s+/gm, '') // Remove list items
        .replace(/^\s*\d+\.\s+/gm, '') // Remove ordered list items
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/\n+/g, ' ') // Replace newlines with spaces
        .trim();
}

export function getAllPostSlugs() {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map((fileName) => {
            return {
                params: {
                    slug: fileName.replace(/\.md$/, ''),
                },
            };
        });
}

export async function getPostData(slug: string): Promise<PostData> {
    // Slug is now the original filename (not encoded)
    let targetSlug = slug;
    let fullPath = path.join(postsDirectory, `${targetSlug}.md`);

    if (!fs.existsSync(fullPath)) {
        // Try decoding the slug if the file doesn't exist
        targetSlug = decodeURIComponent(slug);
        fullPath = path.join(postsDirectory, `${targetSlug}.md`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    let title = matterResult.data.title;
    let date = matterResult.data.date;

    // Fallback for title
    if (!title) {
        const titleMatch = matterResult.content.match(/^#\s+(.*)/m);
        if (titleMatch) {
            title = titleMatch[1];
        } else {
            title = slug;
        }
    }

    // Fallback for date
    if (!date) {
        const stats = fs.statSync(fullPath);
        date = stats.mtime.toISOString().split('T')[0];
    }

    // Rewrite image paths - automatically handle img, img2, img3, img4, etc.
    let content = matterResult.content;
    content = content.replace(/\.\/img(\d*)\//g, '/images/blog/img$1/');

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
        slug,
        contentHtml,
        title,
        date,
        ...matterResult.data,
    };
}
