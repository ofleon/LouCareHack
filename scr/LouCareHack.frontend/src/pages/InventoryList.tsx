import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Unit, PaginatedResponse } from "@/types/inventory";

const InventoryList = () => {
  const navigate = useNavigate();
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const apiUrl = `/api/Unit/admin/list?page=1&pageSize=10`;
        console.log('Fetching from:', apiUrl);

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          throw new Error(`Failed to fetch inventory data: ${response.status} ${response.statusText}`);
        }

        const responseText = await response.text();
        console.log('Raw response:', responseText);

        let responseData: PaginatedResponse<Unit>;
        try {
          responseData = JSON.parse(responseText);
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError);
          throw new Error('Failed to parse response as JSON');
        }

        console.log('API Response:', responseData);

        if (responseData.succeded && responseData.data?.items) {
          setUnits(responseData.data.items);
        } else {
          throw new Error('Failed to fetch inventory data: Invalid response format');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
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
            Housing Inventory List
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
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    State
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Zip
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {units.map((unit) => (
                  <tr key={unit.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">{unit.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{unit.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{unit.state}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{unit.zip}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{unit.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{unit.capacity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        unit.unitStatusName === 'Available'
                          ? 'bg-green-100 text-green-800'
                          : unit.unitStatusName === 'Occupied'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {unit.unitStatusName}
                    </span>
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

export default InventoryList;
