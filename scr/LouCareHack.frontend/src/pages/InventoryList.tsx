import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Unit } from "@/types/inventory";

// Hard-coded mock data for inventory demo
const mockUnits: Unit[] = [
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
    createAt: new Date().toISOString()
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
    createAt: new Date().toISOString()
  },
  {
    id: "3",
    address: "789 Pine Road",
    city: "Louisville",
    state: "KY",
    zip: "40204",
    type: "Duplex",
    capacity: 4,
    unitStatusName: "Occupied",
    unitStatusId: "2",
    isActive: true,
    createAt: new Date().toISOString()
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
    createAt: new Date().toISOString()
  },
  {
    id: "5",
    address: "202 Maple Drive",
    city: "Louisville",
    state: "KY",
    zip: "40206",
    type: "Apartment",
    capacity: 2,
    unitStatusName: "Maintenance",
    unitStatusId: "3",
    isActive: true,
    createAt: new Date().toISOString()
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
    createAt: new Date().toISOString()
  },
  {
    id: "7",
    address: "404 Willow Way",
    city: "Louisville",
    state: "KY",
    zip: "40209",
    type: "Apartment",
    capacity: 3,
    unitStatusName: "Occupied",
    unitStatusId: "2",
    isActive: true,
    createAt: new Date().toISOString()
  },
  {
    id: "8",
    address: "505 Elm Boulevard",
    city: "Louisville",
    state: "KY",
    zip: "40210",
    type: "Group Home",
    capacity: 8,
    unitStatusName: "Available",
    unitStatusId: "1",
    isActive: true,
    createAt: new Date().toISOString()
  }
];

const InventoryList = () => {
  const navigate = useNavigate();
  const [units] = useState<Unit[]>(mockUnits);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockUnits.length / itemsPerPage);

  // Get current page items
  const indexOfLastUnit = currentPage * itemsPerPage;
  const indexOfFirstUnit = indexOfLastUnit - itemsPerPage;
  const currentUnits = units.slice(indexOfFirstUnit, indexOfLastUnit);

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
                {currentUnits.map((unit) => (
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
          {totalPages > 1 && (
            <div className="px-6 py-4 flex justify-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryList;
