import axios from 'axios';
import { SidebarItem, SidebarLink, SidebarSection } from '@/types/sidebar';

axios.interceptors.request.use((config) => {
    console.log('Requisição Axios:', config);
    return config;
});

axios.interceptors.response.use(
    (response) => {
        console.log('Resposta Axios:', response.data);
        return response;
    },
    (error) => {
        console.error('Erro na resposta Axios:', error);
        return Promise.reject(error);
    }
);

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL não está definida no arquivo .env');
}

export const fetchMarkdownFile = async (filename: string): Promise<string> => {
    const response = await axios.get(`${BASE_URL}/${filename}`);
    return response.data;
};

export const fetchSidebar = async (): Promise<SidebarItem[]> => {
    const response = await axios.get(`${BASE_URL}/_sidebar.md`);
    const sidebarContent = response.data;

    const lines = sidebarContent.split('\n');
    const sidebar: SidebarItem[] = [];
    let currentSection: SidebarSection | null = null;

    lines.forEach((line: string) => {
        if (line.startsWith('- ')) {
            const match = line.match(/- (.+)/);
            if (match) {
                const label = match[1].trim();

                if (!line.includes('[')) {
                    currentSection = { label, children: [] };
                    sidebar.push(currentSection);
                } else {
                    const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
                    if (linkMatch) {
                        const link: SidebarLink = { 
                            label: linkMatch[1], 
                            path: linkMatch[2] 
                        };
                        if (currentSection) {
                            currentSection.children.push(link);
                        } else {
                            sidebar.push(link);
                        }
                    }
                }
            }
        } else if (line.startsWith('  - ')) {
            const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
            if (linkMatch && currentSection) {
                const link: SidebarLink = { 
                    label: linkMatch[1], 
                    path: linkMatch[2] 
                };
                currentSection.children.push(link);
            }
        }
    });

    sidebar.push({
        label: '⚙️ Configurações',
        children: [
            {
                label: 'Painel de Administração',
                path: 'admin'
            }
        ]
    } as SidebarSection);

    return sidebar;
};