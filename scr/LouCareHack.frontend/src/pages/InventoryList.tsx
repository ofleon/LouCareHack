import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const InventoryList = () => {
  const navigate = useNavigate();

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
                {/* We'll populate this with actual data once the API is ready */}
                <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">123 Main St</td>
                <td className="px-6 py-4 whitespace-nowrap">Louisville</td>
                <td className="px-6 py-4 whitespace-nowrap">KY</td>
                <td className="px-6 py-4 whitespace-nowrap">40202</td>
                <td className="px-6 py-4 whitespace-nowrap">APT</td>
                <td className="px-6 py-4 whitespace-nowrap">4</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Available
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">456 Oak Ave</td>
                <td className="px-6 py-4 whitespace-nowrap">Louisville</td>
                <td className="px-6 py-4 whitespace-nowrap">KY</td>
                <td className="px-6 py-4 whitespace-nowrap">40202</td>
                <td className="px-6 py-4 whitespace-nowrap">Suite</td>
                <td className="px-6 py-4 whitespace-nowrap">2</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Available
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">789 Pine St</td>
                <td className="px-6 py-4 whitespace-nowrap">Louisville</td>
                <td className="px-6 py-4 whitespace-nowrap">KY</td>
                <td className="px-6 py-4 whitespace-nowrap">40202</td>
                <td className="px-6 py-4 whitespace-nowrap">Unit</td>
                <td className="px-6 py-4 whitespace-nowrap">5</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">101 Maple Rd</td>
                <td className="px-6 py-4 whitespace-nowrap">Louisville</td>
                <td className="px-6 py-4 whitespace-nowrap">KY</td>
                <td className="px-6 py-4 whitespace-nowrap">40202</td>
                <td className="px-6 py-4 whitespace-nowrap">APT</td>
                <td className="px-6 py-4 whitespace-nowrap">7</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Available
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">234 Birch Ln</td>
                <td className="px-6 py-4 whitespace-nowrap">Louisville</td>
                <td className="px-6 py-4 whitespace-nowrap">KY</td>
                <td className="px-6 py-4 whitespace-nowrap">40202</td>
                <td className="px-6 py-4 whitespace-nowrap">Suite</td>
                <td className="px-6 py-4 whitespace-nowrap">3</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Unavailable
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">567 Cedar St</td>
                <td className="px-6 py-4 whitespace-nowrap">Louisville</td>
                <td className="px-6 py-4 whitespace-nowrap">KY</td>
                <td className="px-6 py-4 whitespace-nowrap">40202</td>
                <td className="px-6 py-4 whitespace-nowrap">APT</td>
                <td className="px-6 py-4 whitespace-nowrap">1</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Available
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">890 Elm Blvd</td>
                <td className="px-6 py-4 whitespace-nowrap">Louisville</td>
                <td className="px-6 py-4 whitespace-nowrap">KY</td>
                <td className="px-6 py-4 whitespace-nowrap">40202</td>
                <td className="px-6 py-4 whitespace-nowrap">Suite</td>
                <td className="px-6 py-4 whitespace-nowrap">6</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">678 Willow Dr</td>
                <td className="px-6 py-4 whitespace-nowrap">Louisville</td>
                <td className="px-6 py-4 whitespace-nowrap">KY</td>
                <td className="px-6 py-4 whitespace-nowrap">40202</td>
                <td className="px-6 py-4 whitespace-nowrap">Unit</td>
                <td className="px-6 py-4 whitespace-nowrap">8</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Unavailable
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">321 Maple Ave</td>
                <td className="px-6 py-4 whitespace-nowrap">Louisville</td>
                <td className="px-6 py-4 whitespace-nowrap">KY</td>
                <td className="px-6 py-4 whitespace-nowrap">40202</td>
                <td className="px-6 py-4 whitespace-nowrap">APT</td>
                <td className="px-6 py-4 whitespace-nowrap">10</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Available
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">135 Pine Blvd</td>
                <td className="px-6 py-4 whitespace-nowrap">Louisville</td>
                <td className="px-6 py-4 whitespace-nowrap">KY</td>
                <td className="px-6 py-4 whitespace-nowrap">40202</td>
                <td className="px-6 py-4 whitespace-nowrap">Unit</td>
                <td className="px-6 py-4 whitespace-nowrap">12</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">246 Elm St</td>
                <td className="px-6 py-4 whitespace-nowrap">Louisville</td>
                <td className="px-6 py-4 whitespace-nowrap">KY</td>
                <td className="px-6 py-4 whitespace-nowrap">40202</td>
                <td className="px-6 py-4 whitespace-nowrap">APT</td>
                <td className="px-6 py-4 whitespace-nowrap">9</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Available
                  </span>
                </td>
              </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryList;
