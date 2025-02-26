import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Applicant } from "@/services/applicantService";
import { Unit } from "@/types/inventory";

interface MatchedHousing {
  applicant: Applicant;
  unit: Unit | null;
  priority: number;
}

// Mock data for applicants
const mockApplicants: Applicant[] = [
  {
    userId: "1",
    firstName: "James",
    lastName: "Wilson",
    doB: "1965-05-12T10:30:00Z",
    phoneNumber: "502-555-0101",
    email: "jwilson@example.com",
    gender: "Male",
    isActive: true,
    createAt: "2023-12-01T14:22:00Z",
    condition: {
      id: "1",
      name: "Cancer"
    },
    conditionId: "1",
    contactId: null,
    contact: null,
    user: null
  },
  {
    userId: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    doB: "1980-10-25T08:45:00Z",
    phoneNumber: "502-555-0102",
    email: "sjohnson@example.com",
    gender: "Female",
    isActive: true,
    createAt: "2023-12-05T09:30:00Z",
    condition: {
      id: "2",
      name: "Terminal Illness"
    },
    conditionId: "2",
    contactId: null,
    contact: null,
    user: null
  },
  {
    userId: "3",
    firstName: "Robert",
    lastName: "Martinez",
    doB: "1972-03-18T14:15:00Z",
    phoneNumber: "502-555-0103",
    email: "rmartinez@example.com",
    gender: "Male",
    isActive: true,
    createAt: "2023-12-10T11:45:00Z",
    condition: {
      id: "3",
      name: "Physical Disability"
    },
    conditionId: "3",
    contactId: null,
    contact: null,
    user: null
  },
  {
    userId: "4",
    firstName: "Emily",
    lastName: "Davis",
    doB: "1995-07-30T16:20:00Z",
    phoneNumber: "502-555-0104",
    email: "edavis@example.com",
    gender: "Female",
    isActive: true,
    createAt: "2023-12-15T13:10:00Z",
    condition: {
      id: "4",
      name: "Mental Health Condition"
    },
    conditionId: "4",
    contactId: null,
    contact: null,
    user: null
  },
  {
    userId: "5",
    firstName: "William",
    lastName: "Thompson",
    doB: "1945-11-11T09:45:00Z",
    phoneNumber: "502-555-0105",
    email: "wthompson@example.com",
    gender: "Male",
    isActive: true,
    createAt: "2023-12-20T10:30:00Z",
    condition: {
      id: "5",
      name: "Elderly"
    },
    conditionId: "5",
    contactId: null,
    contact: null,
    user: null
  },
  {
    userId: "6",
    firstName: "Lisa",
    lastName: "Brown",
    doB: "1983-09-05T11:30:00Z",
    phoneNumber: "502-555-0106",
    email: "lbrown@example.com",
    gender: "Female",
    isActive: true,
    createAt: "2023-12-25T15:45:00Z",
    condition: {
      id: "6",
      name: "Chronic Medical Condition"
    },
    conditionId: "6",
    contactId: null,
    contact: null,
    user: null
  }
];

// Mock data for available units
const mockAvailableUnits: Unit[] = [
  {
    id: "1",
    address: "123 Main Street",
    city: "Louisville",
    state: "KY",
    zip: "40202",
    type: "Apartment",
    capacity: 3,
    unitStatusName: "Available",
    unitStatusId: "1",
    isActive: true,
    createAt: "2023-11-01T10:00:00Z"
  },
  {
    id: "2",
    address: "456 Oak Avenue",
    city: "Louisville",
    state: "KY",
    zip: "40203",
    type: "Single Family Home",
    capacity: 5,
    unitStatusName: "Available",
    unitStatusId: "1",
    isActive: true,
    createAt: "2023-11-05T09:30:00Z"
  },
  {
    id: "4",
    address: "101 Cedar Lane",
    city: "Louisville",
    state: "KY",
    zip: "40205",
    type: "Townhouse",
    capacity: 4,
    unitStatusName: "Available",
    unitStatusId: "1",
    isActive: true,
    createAt: "2023-11-15T14:45:00Z"
  },
  {
    id: "6",
    address: "303 Birch Street",
    city: "Louisville",
    state: "KY",
    zip: "40208",
    type: "Single Family Home",
    capacity: 6,
    unitStatusName: "Available",
    unitStatusId: "1",
    isActive: true,
    createAt: "2023-11-20T11:15:00Z"
  }
];

const getPriorityScore = (condition: string): number => {
  const priorityMap: { [key: string]: number } = {
    'Cancer': 5,
    'Terminal Illness': 5,
    'Chronic Medical Condition': 4,
    'Physical Disability': 4,
    'Mental Health Condition': 3,
    'Elderly': 3,
    'Veteran': 3,
    'Family with Children': 2,
    'General': 1
  };

  return priorityMap[condition] || 1;
};

const MatchedHousing = () => {
  const navigate = useNavigate();

  // Create matched housing data from our mock data
  const createMatchedHousingData = (): MatchedHousing[] => {
    // Map applicants to housing matches with priority scores
    const matchedData = mockApplicants.map(applicant => ({
      applicant,
      priority: getPriorityScore(applicant.condition.name),
      unit: null as Unit | null
    }));

    // Sort by priority (highest first)
    matchedData.sort((a, b) => b.priority - a.priority);

    // Assign units to applicants based on priority
    for (let i = 0; i < Math.min(matchedData.length, mockAvailableUnits.length); i++) {
      matchedData[i].unit = mockAvailableUnits[i];
    }

    return matchedData;
  };

  // Initialize state with the matched housing data
  const [matchedHousing] = useState<MatchedHousing[]>(createMatchedHousingData());

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            Matched Housing Assignments
          </h1>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Condition
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Matched Housing
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {matchedHousing.map((match, index) => (
                  <tr key={match.applicant.userId} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        match.priority >= 4 ? 'bg-red-100 text-red-800' :
                        match.priority >= 3 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {match.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {match.applicant.firstName} {match.applicant.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {match.applicant.condition.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {match.unit ? match.unit.address : 'Waiting for available unit'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchedHousing;
