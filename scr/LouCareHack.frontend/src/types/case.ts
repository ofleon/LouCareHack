export interface Case {
  userId: string;
  firstName: string;
  lastName: string;
  doB: string;
  phoneNumber: string | null;
  email: string;
  gender: string;
  isActive: boolean;
  createAt: string;
  condition: {
    id: string;
    name: string;
  };
  conditionId: string;
  contactId: string | null;
  contact: null;
  user: null;
}

export interface CaseWorker {
  id: string;
  name: string;
}

export const CASE_WORKERS: CaseWorker[] = [
  { id: "tim-hanks", name: "Tim Hanks" },
  { id: "jim-bill", name: "Jim Bill" },
  { id: "frank-vars", name: "Frank Vars" },
  { id: "yu-lee", name: "Yu Lee" }
];
