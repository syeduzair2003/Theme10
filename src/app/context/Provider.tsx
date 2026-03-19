'use client';

import { createContext, useContext } from 'react';

const CompanyContext = createContext<any>(null);

export function useCompany() {
  return useContext(CompanyContext);
}

export default function Provider({ companyData, children }: any) {
  return (
    <CompanyContext.Provider value={companyData}>
      {children}
    </CompanyContext.Provider>
  );
}