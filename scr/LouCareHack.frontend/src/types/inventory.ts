export interface Unit {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  type: string;
  capacity: number;
  unitStatusId: string;
  unitStatusName: string;
  isActive: boolean;
  createAt: string;
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

export interface PaginatedResponse<T> {
  succeded: boolean;
  message: string | null;
  errors: string[];
  data: {
    items: T[];
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
  };
}
