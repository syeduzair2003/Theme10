import React from 'react';
import { apiRecentlyUpdatedStores } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import { splitHeading } from '@/constants/hooks';
import RecentlyUpdatedStoresCard from './RecentlyUpdatedStoresCard';

interface RecentlyUpdatedStoresProps {
  companyId?: string;
  merSlug: string;
  slugType: string;
}

const RecentlyUpdatedStores = async ({ companyId, merSlug, slugType }: RecentlyUpdatedStoresProps) => {
  if (!companyId) return null;

  const companyDomain = (await cookieService.get("domain")).domain;
  const response = await apiRecentlyUpdatedStores(companyDomain);
  // const stores = response?.data || [];
  const stores = response?.data?.slice(0, 8) || [];
  const [first, second] = splitHeading("Recently Updated Stores");

  if (!stores.length) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">

        {/* Heading - Clean & Authoritative */}
        <div className="mb-12 border-l-4 border-indigo-600 pl-6">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            <span className="text-slate-900">{first} </span>
            <span className="text-indigo-600">{second}</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Fresh deals and offers from your favorite stores
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stores.map((store: any) => (
            <RecentlyUpdatedStoresCard
              key={store.id} 
              store={store}
              companyDomain={companyDomain}
              merSlug={merSlug}
              slugType={slugType}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyUpdatedStores;