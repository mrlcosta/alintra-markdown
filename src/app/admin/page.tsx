'use client';

import { useEffect, useState } from 'react';
import { diffLines } from 'diff';
import { DiffPart } from '@/types/diff';

interface EditedDoc {
    filename: string;
    content: string;
    lastModified: string;
    originalContent: string;
}

interface StoredDoc {
    content: string;
    lastModified: string;
    originalContent: string;
}

export default function AdminPage() {
    const [editedDocs, setEditedDocs] = useState<EditedDoc[]>([]);
    const [selectedDoc, setSelectedDoc] = useState<EditedDoc | null>(null);
    const [diff, setDiff] = useState<DiffPart[]>([]);

    useEffect(() => {
        try {
            const storedDocs = localStorage.getItem('markdown_docs');
            if (storedDocs) {
                const parsedDocs = JSON.parse(storedDocs) as Record<string, StoredDoc>;
                const docsArray = Object.entries(parsedDocs).map(([filename, doc]) => ({
                    filename,
                    content: doc.content,
                    lastModified: doc.lastModified,
                    originalContent: doc.originalContent
                }));

                const sortedDocs = docsArray.sort((a, b) => 
                    new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
                );

                setEditedDocs(sortedDocs);
            }
        } catch (error) {
            console.error('Erro ao carregar documentos:', error);
        }
    }, []);

    const showDiff = (doc: EditedDoc) => {
        setSelectedDoc(doc);
        const differences = diffLines(doc.originalContent, doc.content) as DiffPart[];
        setDiff(differences);
    };

    if (editedDocs.length === 0) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-6">Administração de Documentos</h1>
                <p className="text-gray-500">Nenhum documento foi editado ainda.</p>
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Administração de Documentos</h1>
            
            <div className="grid grid-cols-2 gap-8">
                <div className="border rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4">Documentos Editados</h2>
                    <div className="space-y-4">
                        {editedDocs.map(doc => (
                            <div
                                key={doc.filename}
                                onClick={() => showDiff(doc)}
                                className="p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                                <h3 className="font-medium text-blue-600">{doc.filename}</h3>
                                <p className="text-sm text-gray-500">
                                    Editado em: {new Date(doc.lastModified).toLocaleString('pt-BR')}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {selectedDoc ? (
                    <div className="border rounded-lg p-4">
                        <h2 className="text-xl font-semibold mb-4">
                            Diferenças: {selectedDoc.filename}
                        </h2>
                        <div className="border rounded-md p-4 font-mono text-sm whitespace-pre-wrap bg-gray-50">
                            {diff.map((part, index) => (
                                <span
                                    key={index}
                                    className={`block ${
                                        part.added ? 'bg-green-100 text-green-800' :
                                        part.removed ? 'bg-red-100 text-red-800' :
                                        'text-gray-700'
                                    }`}
                                >
                                    {part.added ? '+ ' : part.removed ? '- ' : '  '}
                                    {part.value}
                                </span>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="border rounded-lg p-4 flex items-center justify-center text-gray-500">
                        Selecione um documento para ver as diferenças
                    </div>
                )}
            </div>
        </div>
    );
}