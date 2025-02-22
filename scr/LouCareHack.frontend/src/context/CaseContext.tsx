import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Case } from '../types/case';

interface CaseContextType {
  cases: Case[];
  addCase: (newCase: Case) => void;
  deleteCase: (id: string) => void;
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

  return (
    <CaseContext.Provider value={{ cases, addCase, deleteCase }}>
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
