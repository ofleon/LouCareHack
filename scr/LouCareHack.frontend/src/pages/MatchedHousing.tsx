import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Applicant } from "@/services/applicantService";
import { Unit } from "@/types/inventory";
import { fetchApplicants } from "@/services/applicantService";
import { fetchUnits } from "@/services/unitService";

interface MatchedHousing {
  applicant: Applicant;
  unit: Unit | null;
  priority: number;
}

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
  const [matchedHousing, setMatchedHousing] = useState<MatchedHousing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [applicantsResponse, unitsResponse] = await Promise.all([
          fetchApplicants(1, 100),
          fetchUnits(1, 100)
        ]);

        const availableUnits = unitsResponse.data.items.filter(
          unit => unit.unitStatusName === 'Available'
        );

        const matched = applicantsResponse.data.items.map(applicant => ({
          applicant,
          priority: getPriorityScore(applicant.condition.name),
          unit: null as Unit | null
        }));

        // Sort by priority (highest first)
        matched.sort((a, b) => b.priority - a.priority);

        // Assign units to applicants based on priority
        matched.forEach((match, index) => {
          if (index < availableUnits.length) {
            match.unit = availableUnits[index];
          }
        });

        setMatchedHousing(matched);
        setError(null);
      } catch (err) {
        setError('Failed to load matched housing data. Please try again later.');
        console.error('Error loading matched housing:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

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
