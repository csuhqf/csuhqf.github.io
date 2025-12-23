'use client';

import Giscus from '@giscus/react';

export default function Comments() {
    return (
        <div style={{ marginTop: '3rem' }}>
            <Giscus
                id="comments"
                repo="csuhqf/csuhqf.github.io"
                repoId="R_kgDOQaYuJw"
                category="Announcements"
                categoryId="DIC_kwDOQaYuJ84C0KdJ"
                mapping="pathname"
                strict="0"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme="preferred_color_scheme"
                lang="zh-CN"
                loading="lazy"
            />
        </div>
    );
}
