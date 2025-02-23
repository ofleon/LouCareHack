import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusBadge from "@/components/StatusBadge";
import AssignUnit from "@/components/AssignUnit";
import { useToast } from "@/hooks/use-toast";
import { useCases } from "@/context/CaseContext";
import { CASE_WORKERS, Case } from "@/types/case";

const Dashboard = () => {
  const { cases, deleteCase, updateCase } = useCases();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    deleteCase(id);
    toast({
      title: "Case deleted",
      description: "The case has been successfully removed.",
    });
  };

  const handleStatusChange = (id: string, newStatus: "Pending" | "Enrolled" | "Closed") => {
    const caseToUpdate = cases.find(c => c.id === id);
    if (caseToUpdate) {
      const updatedCase: Case = {
        ...caseToUpdate,
        status: newStatus
      };
      updateCase(updatedCase);
      toast({
        title: "Status updated",
        description: `Case status has been updated to ${newStatus}.`,
      });
    }
  };


  const handleAssignUnitChange = (id: string, newAssignUnit: "Waiting" | "Assigned") => {
    const caseToUpdate = cases.find(c => c.id === id);
    if (caseToUpdate) {
      const updatedCase: Case = {
        ...caseToUpdate,
        assignUnit: newAssignUnit
      };
      updateCase(updatedCase);
      toast({
        title: "Status updated",
        description: `Unit status has been updated to ${newAssignUnit}.`,
      });
    }
  };

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
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Case Worker
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Unit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cases.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {c.firstName} {c.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{c.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {c.currentLocation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {c.caseWorker}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <AssignUnit assignUnit={c.assignUnit}
                        isEditable={true}
                        onAssignUnitChange={(newAssignUnit) => handleAssignUnitChange(c.id, newAssignUnit)}/>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge
                        status={c.status}
                        isEditable={true}
                        onStatusChange={(newStatus) => handleStatusChange(c.id, newStatus)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(c.id)}
                      >
                        Delete
                      </Button>
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

export default Dashboard;
