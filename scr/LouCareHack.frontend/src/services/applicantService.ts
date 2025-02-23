import { PaginatedResponse } from "@/types/inventory";

export interface Applicant {
  userId: string;
  contactId: string | null;
  firstName: string;
  lastName: string;
  doB: string;
  conditionId: string;
  gender: string;
  phoneNumber: string | null;
  email: string;
  isActive: boolean;
  createAt: string;
  condition: {
    id: string;
    name: string;
  };
  contact: null;
  user: null;
}

const isDevelopment = import.meta.env.MODE === 'development';
const API_BASE_URL = isDevelopment ? '/api' : import.meta.env.VITE_API_BASE_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const fetchApplicants = async (page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Applicant>> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const response = await fetch(
      `/api/Applicant/admin/list?page=${page}&pageSize=${pageSize}`,
      {
        method: 'GET',
        headers,
        credentials: 'include',
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Failed to fetch applicants: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching applicants:', error);
    throw error;
  }
};
