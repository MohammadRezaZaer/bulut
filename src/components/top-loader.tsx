
'use client';

import NextTopLoader from 'nextjs-progressbar';

export default function TopLoader() {
    return (
        <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
        />
    );
}
