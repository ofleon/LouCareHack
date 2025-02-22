
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";

interface Case {
  id: string;
  name: string;
  age: number;
  ssn: string;
  caseWorker: string;
  status: "In Progress" | "Not Submitted" | "Completed";
}

const initialCases: Case[] = [
  {
    id: "1",
    name: "John Doe",
    age: 43,
    ssn: "4455",
    caseWorker: "Tim Hanks",
    status: "In Progress",
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 39,
    ssn: "1234",
    caseWorker: "Jim Bill",
    status: "Not Submitted",
  },
  {
    id: "3",
    name: "Kia Bruce",
    age: 57,
    ssn: "7842",
    caseWorker: "Frank Vars",
    status: "Completed",
  },
  {
    id: "4",
    name: "Leo Mann",
    age: 72,
    ssn: "9923",
    caseWorker: "Yu Lee",
    status: "In Progress",
  },
];

const Index = () => {
  const [cases, setCases] = useState<Case[]>(initialCases);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    setCases((prev) => prev.filter((c) => c.id !== id));
    toast({
      title: "Case deleted",
      description: "The case has been successfully removed.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            Case Worker Dashboard
          </h1>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary hover:bg-primary/90 transition-colors"
          >
            {showForm ? "Close Form" : "New Case"}
          </Button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg p-6 shadow-lg animate-fadeIn">
            <h2 className="text-xl font-semibold mb-6">Request Form</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter first name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter last name" />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" />
                </div>
                <div>
                  <Label htmlFor="ssn">SSN</Label>
                  <Input id="ssn" placeholder="Enter SSN" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="disability">Disability (optional)</Label>
                  <Input id="disability" placeholder="Enter disability if any" />
                </div>
                <div>
                  <Label htmlFor="sex">Sex (M/F)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Male</SelectItem>
                      <SelectItem value="F">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dependents">Dependent (number)</Label>
                  <Input
                    id="dependents"
                    type="number"
                    placeholder="Enter number of dependents"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Label htmlFor="caseWorker">Case Worker</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select case worker" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tim-hanks">Tim Hanks</SelectItem>
                  <SelectItem value="jim-bill">Jim Bill</SelectItem>
                  <SelectItem value="frank-vars">Frank Vars</SelectItem>
                  <SelectItem value="yu-lee">Yu Lee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="mt-6">Submit</Button>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SSN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Case Worker
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
                    <td className="px-6 py-4 whitespace-nowrap">{c.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{c.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{c.ssn}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {c.caseWorker}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={c.status} />
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

export default Index;
