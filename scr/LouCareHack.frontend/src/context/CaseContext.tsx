import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Case } from '@/types/case';
import { mockCases } from '@/mock/cases';

interface CaseContextType {
  cases: Case[];
  addCase: (newCase: Case) => void;
  updateCase: (updatedCase: Case) => void;
  deleteCase: (id: string) => void;
}

const CaseContext = createContext<CaseContextType | undefined>(undefined);

export function CaseProvider({ children }: { children: ReactNode }) {
  // Initialize with mock data
  const [cases, setCases] = useState<Case[]>(mockCases);

  const addCase = (newCase: Case) => {
    setCases(prevCases => [...prevCases, newCase]);
  };

  const updateCase = (updatedCase: Case) => {
    setCases(prevCases =>
      prevCases.map(c => (c.id === updatedCase.id ? updatedCase : c))
    );
  };

  const deleteCase = (id: string) => {
    setCases(prevCases => prevCases.filter(c => c.id !== id));
  };

  return (
    <CaseContext.Provider value={{ cases, addCase, updateCase, deleteCase }}>
      {children}
    </CaseContext.Provider>
  );
}

export function useCases() {
  const context = useContext(CaseContext);
  if (context === undefined) {
    throw new Error('useCases must be used within a CaseProvider');
  }
  return context;
}
