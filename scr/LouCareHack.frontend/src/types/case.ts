export interface Case {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  ssn?: string;
  caseWorker: string;
  assignUnit: "Pending" | "Assigned";
  status: "pending" | "enrolled" | "closed";
  dateOfBirth: string;
  disability?: string;
  currentLocation?: string;
  phoneNumber?: string;
  veteranStatus?: "yes" | "no";
  housingNeeds?: string;
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
