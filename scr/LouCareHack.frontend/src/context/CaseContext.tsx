import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Case } from '../types/case';

interface CaseContextType {
  cases: Case[];
  addCase: (newCase: Case) => void;
  deleteCase: (id: string) => void;
  updateCase: (updatedCase: Case) => void;
}

const CaseContext = createContext<CaseContextType | undefined>(undefined);

export function CaseProvider({ children }: { children: ReactNode }) {
  const [cases, setCases] = useState<Case[]>([]);

  const addCase = (newCase: Case) => {
    setCases(prev => [...prev, { ...newCase, id: Date.now().toString() }]);
  };

  const deleteCase = (id: string) => {
    setCases(prev => prev.filter(c => c.id !== id));
  };

  const updateCase = (updatedCase: Case) => {
    setCases(prev => prev.map(c => c.id === updatedCase.id ? updatedCase : c));
  };

  return (
    <CaseContext.Provider value={{ cases, addCase, deleteCase, updateCase }}>
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
