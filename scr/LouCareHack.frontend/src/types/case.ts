export interface Case {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  ssn?: string;
  caseWorker: string;
  assignUnit: "Waiting" | "Assigned";
  status: "Pending" | "Enrolled" | "Closed";
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
