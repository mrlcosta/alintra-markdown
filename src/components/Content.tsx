'use client';

import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDocumentState } from '@/hooks/useDocumentState';
import gfm from 'remark-gfm';

interface ContentProps {
    content: string;
    filename: string;
}

const Content: React.FC<ContentProps> = ({ content, filename }) => {
    const { 
        content: localContent, 
        isEditing, 
        isSynced, 
        setEditing, 
        saveChanges 
    } = useDocumentState(filename, content);

    const [editableContent, setEditableContent] = React.useState(localContent);

    useEffect(() => {
        setEditableContent(localContent);
    }, [localContent]);

    const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditableContent(e.target.value);
    };

    const handleSave = () => {
        saveChanges(editableContent);
        setEditing(false);
    };

    return (
        <div className="relative">
            <div className="sticky top-0 z-10 flex items-center justify-end gap-2 p-4 bg-white/80 backdrop-blur">
                <span className={`px-2 py-1 rounded-md text-sm ${
                    isSynced ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                    {isSynced ? 'Sincronizado' : 'Modificado Localmente'}
                </span>
                <button
                    onClick={() => setEditing(!isEditing)}
                    className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                >
                    {isEditing ? 'Cancelar' : 'Editar'}
                </button>
                {isEditing && (
                    <button
                        onClick={handleSave}
                        className="px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600"
                    >
                        Salvar
                    </button>
                )}
            </div>

            <div className="mt-4">
                {isEditing ? (
                    <textarea
                        value={editableContent}
                        onChange={handleEditorChange}
                        className="w-full h-[calc(100vh-200px)] p-4 border rounded-md font-mono"
                    />
                ) : (
                    <ReactMarkdown remarkPlugins={[gfm]}>{localContent}</ReactMarkdown>
                )}
            </div>
        </div>
    );
};

export default Content;