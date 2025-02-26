import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Applicant, fetchApplicants } from "@/services/applicantService";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data that resembles the screenshot
const mockApplicants = [
  {
    userId: "1",
    firstName: "Sarah",
    lastName: "Smith",
    age: 32,
    location: "South End",
    caseWorker: "Jim Bill",
    assignedUnit: "Assigned",
    status: "Closed",
  },
  {
    userId: "2",
    firstName: "Michael",
    lastName: "Johnson",
    age: 58,
    location: "West End",
    caseWorker: "Frank Vars",
    assignedUnit: "Waiting",
    status: "Pending",
  },
  {
    userId: "3",
    firstName: "Maria",
    lastName: "Garcia",
    age: 28,
    location: "East End",
    caseWorker: "Yu Lee",
    assignedUnit: "Assigned",
    status: "Closed",
  },
  {
    userId: "4",
    firstName: "Robert",
    lastName: "Wilson",
    age: 52,
    location: "Highlands",
    caseWorker: "Tim Hanks",
    assignedUnit: "Waiting",
    status: "Closed",
  },
  {
    userId: "5",
    firstName: "Gobin",
    lastName: "bastla",
    age: 0,
    location: "Louisville",
    caseWorker: "Jim Bill",
    assignedUnit: "Assigned",
    status: "Pending",
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [applicants, setApplicants] = useState<typeof mockApplicants>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(true);

  // Analytics data (mock)
  const analyticsData = {
    totalUnhoused: 1800,
    currentlyHoused: 438,
    inProgress: 312,
    pendingMatches: 127,
    casesClosed: 342,
    goalProgress: 24.3, // percentage
    availableUnits: 56
  };

  // Load applicants from mock data and localStorage
  useEffect(() => {
    try {
      // Get stored applicants from localStorage
      const storedApplicants = JSON.parse(localStorage.getItem('demoApplicants') || '[]');

      // Combine mock and stored applicants
      setApplicants([...mockApplicants, ...storedApplicants]);

      // Update analytics based on new total
      const totalApplicants = mockApplicants.length + storedApplicants.length;
      if (totalApplicants > mockApplicants.length) {
        // This is just for the demo to show the numbers changing when new applicants are added
        const updatedPending = analyticsData.pendingMatches + storedApplicants.length;
        const updatedInProgress = analyticsData.inProgress + storedApplicants.length;
        // We could update the analytics here if needed
      }
    } catch (error) {
      console.error("Error loading applicants:", error);
      setApplicants(mockApplicants); // Fallback to mock data
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (userId: string) => {
    // Remove from display
    setApplicants(prev => prev.filter(a => a.userId !== userId));

    // If it's a stored applicant, remove from localStorage too
    try {
      const storedApplicants = JSON.parse(localStorage.getItem('demoApplicants') || '[]');
      const updatedStored = storedApplicants.filter((a: any) => a.userId !== userId);
      localStorage.setItem('demoApplicants', JSON.stringify(updatedStored));
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }

    toast({
      title: "Case deleted",
      description: "The case has been successfully removed.",
    });
  };

  const handleAssignedUnitChange = (userId: string, newValue: string) => {
    // Update in state
    setApplicants(prev =>
      prev.map(applicant =>
        applicant.userId === userId
          ? { ...applicant, assignedUnit: newValue }
          : applicant
      )
    );

    // Update in localStorage if it exists there
    try {
      const storedApplicants = JSON.parse(localStorage.getItem('demoApplicants') || '[]');
      const updatedStored = storedApplicants.map((a: any) =>
        a.userId === userId ? { ...a, assignedUnit: newValue } : a
      );
      localStorage.setItem('demoApplicants', JSON.stringify(updatedStored));
    } catch (error) {
      console.error("Error updating localStorage:", error);
    }

    toast({
      title: "Unit Assignment Updated",
      description: `Assignment status changed to ${newValue}`,
    });
  };

  const handleStatusChange = (userId: string, newValue: string) => {
    // Update in state
    setApplicants(prev =>
      prev.map(applicant =>
        applicant.userId === userId
          ? { ...applicant, status: newValue }
          : applicant
      )
    );

    // Update in localStorage if it exists there
    try {
      const storedApplicants = JSON.parse(localStorage.getItem('demoApplicants') || '[]');
      const updatedStored = storedApplicants.map((a: any) =>
        a.userId === userId ? { ...a, status: newValue } : a
      );
      localStorage.setItem('demoApplicants', JSON.stringify(updatedStored));
    } catch (error) {
      console.error("Error updating localStorage:", error);
    }

    toast({
      title: "Status Updated",
      description: `Case status changed to ${newValue}`,
    });
  };

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
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard: Case Lists
          </h1>
          <Button variant="destructive" onClick={() => navigate("/")}>
            Log Out
          </Button>
        </div>

        {/* Analytics Section */}
        <div className="mb-8 bg-gray-50 rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Housing Program Progress</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Progress Toward Goal */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="text-sm font-medium text-gray-500 uppercase">Progress Toward Goal</h3>
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{analyticsData.goalProgress}% Complete</span>
                  <span className="text-sm font-medium text-gray-700">{analyticsData.currentlyHoused} of {analyticsData.totalUnhoused}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${analyticsData.goalProgress}%` }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Target: House at least 900 residents (50% of 1,800 unhoused population)
                </p>
              </div>
            </div>

            {/* Case Status Breakdown */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="text-sm font-medium text-gray-500 uppercase">Case Status</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-600">Housed</span>
                  </div>
                  <p className="text-xl font-semibold ml-5">{analyticsData.currentlyHoused}</p>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm text-gray-600">In Progress</span>
                  </div>
                  <p className="text-xl font-semibold ml-5">{analyticsData.inProgress}</p>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm text-gray-600">Pending</span>
                  </div>
                  <p className="text-xl font-semibold ml-5">{analyticsData.pendingMatches}</p>
                </div>
                <div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                    <span className="text-sm text-gray-600">Closed</span>
                  </div>
                  <p className="text-xl font-semibold ml-5">{analyticsData.casesClosed}</p>
                </div>
              </div>
            </div>

            {/* Resource Availability */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="text-sm font-medium text-gray-500 uppercase">Resource Availability</h3>
              <div className="mt-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Available Housing Units</span>
                  <span className="font-semibold text-xl">{analyticsData.availableUnits}</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-2 text-sm"
                  onClick={() => navigate("/inventory")}
                >
                  View Inventory
                </Button>
                <Button
                  variant="outline"
                  className="w-full mt-2 text-sm"
                  onClick={() => navigate("/auto-matched")}
                >
                  View Auto Matches
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex gap-4">
            <Button
              variant="default"
              className="bg-gray-900 hover:bg-gray-800 text-white"
              onClick={() => navigate("/requestdashboard")}
            >
              New Case
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Case Worker
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Assigned Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applicants.length > 0 ? (
                applicants.map((applicant) => (
                  <tr
                    key={applicant.userId}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {applicant.firstName} {applicant.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {applicant.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {applicant.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {applicant.caseWorker}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className={`cursor-pointer relative inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                            applicant.assignedUnit === 'Assigned'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {applicant.assignedUnit}
                            <ChevronDown className="ml-1 h-4 w-4" />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleAssignedUnitChange(applicant.userId, "Assigned")}>
                            Assigned
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAssignedUnitChange(applicant.userId, "Waiting")}>
                            Waiting
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAssignedUnitChange(applicant.userId, "Pending Review")}>
                            Pending Review
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className={`cursor-pointer relative inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                            applicant.status === 'Closed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {applicant.status}
                            <ChevronDown className="ml-1 h-4 w-4" />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleStatusChange(applicant.userId, "Open")}>
                            Open
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(applicant.userId, "Pending")}>
                            Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(applicant.userId, "In Progress")}>
                            In Progress
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(applicant.userId, "Closed")}>
                            Closed
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(applicant.userId)}
                        className="rounded-md bg-red-500 hover:bg-red-600"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No cases found. Please add a new case.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>


      </div>
    </div>
  );
};

export default Dashboard;
