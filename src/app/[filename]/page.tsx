import MainComponent from '@/components/MainComponent';

interface DocumentProps {
    params: { filename: string };
}

export default async function Document({ params }: DocumentProps) {
    const { filename } = params;
    return (
        <MainComponent filename={filename}/>
    );
}