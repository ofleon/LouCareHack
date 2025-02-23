import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StatusBadge from "@/components/StatusBadge";
import AssignUnit from "@/components/AssignUnit";
import { useToast } from "@/hooks/use-toast";
import { Applicant, fetchApplicants } from "@/services/applicantService";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadApplicants = async () => {
      try {
        setLoading(true);
        const response = await fetchApplicants(currentPage, 10);
        setApplicants(response.data.items);
        setTotalPages(response.data.totalPages);
        setError(null);
      } catch (err) {
        setError('Failed to load applicants. Please try again later.');
        console.error('Error loading applicants:', err);
      } finally {
        setLoading(false);
      }
    };

    loadApplicants();
  }, [currentPage]);

  const handleDelete = (userId: string) => {
    setApplicants(prev => prev.filter(a => a.userId !== userId));
    toast({
      title: "Case deleted",
      description: "The case has been successfully removed.",
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            Dashboard: Case Lists
          </h1>
          <Button variant="destructive" onClick={() => navigate("/")}>
            Log Out
          </Button>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="bg-primary text-primary-foreground" onClick={() => navigate("/requestdashboard")}>
                New Case
          </Button>
          <Button variant="outline" className="bg-primary text-primary-foreground" onClick={() => navigate("/inventory")}>
            Inventory List
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Condition
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applicants.map((applicant) => (
                  <tr
                    key={applicant.userId}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {applicant.firstName} {applicant.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {applicant.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {applicant.phoneNumber || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {applicant.condition.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {applicant.gender.trim()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(applicant.userId)}
                      >
                        Delete
                      </Button>
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

export default Dashboard;
