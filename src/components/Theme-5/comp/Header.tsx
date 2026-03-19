import { splitHeading } from '@/constants/hooks';
import Link from 'next/link';
import React from 'react';
import AllProductsHeroCard from './AllProductsHeroCard';

interface Breadcrumb {
    label: string;
    href?: string;
}

interface HeaderProps {
    title: string;
    subtitle?: string;
    breadcrumbs: Breadcrumb[];
    showImage?: boolean;
}

const Header = ({ title, subtitle, breadcrumbs, showImage = false }: HeaderProps) => {
    const [first, second] = splitHeading(title);
    return (
        <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-slate-900">
            <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-indigo-600/10 lg:skew-x-12 lg:translate-x-1/4 pointer-events-none" />
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20">
                    <div className={`${showImage ? 'lg:w-3/5' : 'lg:w-3/5'} space-y-6 md:space-y-8 text-center lg:text-left`}>
                        <h1 className="text-3xl md:text-4xl capitalize font-black text-white tracking-tight leading-tight md:leading-[1.05]">
                            {first} <span className='text-indigo-400'> {second}</span>
                        </h1>
                        <nav className="inline-flex max-w-full overflow-x-auto whitespace-nowrap items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-medium text-slate-400 backdrop-blur-md scrollbar-hide">
                            {breadcrumbs.map((crumb, index) => (
                                <React.Fragment key={index}>
                                    {crumb.href ? (
                                        <Link href={crumb.href} className="hover:text-white transition-colors">
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span className="text-indigo-400">{crumb.label}</span>
                                    )}
                                    {index < breadcrumbs.length - 1 && (
                                        <span className="mx-3 opacity-30">/</span>
                                    )}
                                </React.Fragment>
                            ))}
                        </nav>
                    </div>
                    {showImage && <AllProductsHeroCard />}
                </div>
            </div>
        </section>
    );
};

export default Header;