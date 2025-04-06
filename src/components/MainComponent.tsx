import Sidebar from '@/components/Sidebar';
import Content from '@/components/Content';
import { fetchMarkdownFile, fetchSidebar } from '@/services/bitbucketApi';
import { Suspense } from 'react';

interface DocumentProps {
    filename: string;
}

async function MainContent({ filename }: DocumentProps) {
    const content = await fetchMarkdownFile(`${filename}.md`);
    const sidebarLinks = await fetchSidebar();

    return (
        <div className="flex h-screen">
            <Sidebar links={sidebarLinks} />
            <div className="flex-1 p-4 overflow-auto">
                <Content content={content} filename={filename} />
            </div>
        </div>
    );
}

export default function MainComponent({ filename }: DocumentProps) {
    return (
        <Suspense
            fallback={
                <div className="flex h-screen items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                    <span className="ml-4 text-gray-200">Carregando...</span>
                </div>
            }
        >
            <MainContent filename={filename} />
        </Suspense>
    );
}