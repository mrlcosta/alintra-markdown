'use client';
import { useState, useEffect } from 'react';

interface DocumentState {
    content: string;
    isEditing: boolean;
    lastModified: Date | null;
    isSynced: boolean;
}

interface DocumentStorage {
    [key: string]: {
        content: string;
        lastModified: string;
        originalContent: string;
    };
}

export function useDocumentState(filename: string, originalContent: string) {
    const [state, setState] = useState<DocumentState>({
        content: originalContent,
        isEditing: false,
        lastModified: null,
        isSynced: true
    });

    useEffect(() => {
        const storedDocs = localStorage.getItem('markdown_docs');
        if (storedDocs) {
            const docs: DocumentStorage = JSON.parse(storedDocs);
            const doc = docs[filename];
            
            if (doc) {
                setState({
                    content: doc.content,
                    isEditing: false,
                    lastModified: new Date(doc.lastModified),
                    isSynced: doc.content === originalContent
                });
            }
        }
    }, [filename, originalContent]);

    const saveChanges = (newContent: string) => {
        const storedDocs = localStorage.getItem('markdown_docs') || '{}';
        const docs: DocumentStorage = JSON.parse(storedDocs);
        
        docs[filename] = {
            content: newContent,
            lastModified: new Date().toISOString(),
            originalContent
        };

        localStorage.setItem('markdown_docs', JSON.stringify(docs));
        
        setState({
            content: newContent,
            isEditing: false,
            lastModified: new Date(),
            isSynced: newContent === originalContent
        });
    };

    return {
        ...state,
        saveChanges,
        setEditing: (editing: boolean) => setState(prev => ({ ...prev, isEditing: editing }))
    };
}