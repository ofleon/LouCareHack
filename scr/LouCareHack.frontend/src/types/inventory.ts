export interface Unit {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  type: string;
  capacity: number;
  unitStatusId: string;
  isActive: boolean;
  createdAt: string;
}

export interface CaseAssignment {
  id: string;
  caseId: string;
  unitId: string;
  createdAt: string;
}

export interface User {
  userId: string;
  contactId?: string;
  firstName: string;
  lastName: string;
  dob: string;
  conditionId: string;
  gender: string;
  phoneNumber?: string;
  email?: string;
  isActive: boolean;
  createdAt: string;
}
