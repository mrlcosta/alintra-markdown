import Link from 'next/link';
import { SidebarItem } from '@/types/sidebar';

interface SidebarProps {
    links: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
    const renderLinks = (items: SidebarItem[]) => {
        return (
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index}>
                        {('path' in item) ? (
                            <Link
                                href={`/${item.path.replace('.md', '')}`}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md truncate"
                                title={item.label}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className="block px-4 py-2 text-gray-900 font-semibold truncate"
                                title={item.label}
                            >
                                {item.label}
                            </span>
                        )}
                        {('children' in item) && item.children.length > 0 && (
                            <ul className="ml-4 border-l border-gray-300 pl-4 space-y-1">
                                {renderLinks(item.children)}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="group h-screen">
            <nav
                className="bg-gray-100 h-full p-4 shadow-lg overflow-y-auto transition-all duration-300 
                w-60 group-hover:w-100"
            >
                {renderLinks(links)}
            </nav>
        </div>
    );
};

export default Sidebar;