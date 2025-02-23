import { PaginatedResponse, Unit } from "@/types/inventory";

const isDevelopment = import.meta.env.MODE === 'development';
const API_BASE_URL = isDevelopment ? '/api' : import.meta.env.VITE_API_BASE_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const fetchUnits = async (page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Unit>> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`
    };

    const response = await fetch(
      `${API_BASE_URL}/Unit/admin/list?page=${page}&pageSize=${pageSize}`,
      {
        method: 'GET',
        headers,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Failed to fetch units: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching units:', error);
    throw error;
  }
};
