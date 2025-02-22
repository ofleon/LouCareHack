import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useToast } from "@/hooks/use-toast";
import { useCases } from "@/context/CaseContext";
import { CASE_WORKERS } from "@/types/case";
import AssignUnit from "@/components/AssignUnit";

const Request = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addCase } = useCases();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    currentLocation: "",
    disability: "",
    veteranStatus: "no" as "yes" | "no",
    housingNeeds: "",
    caseWorker: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate age from date of birth
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Check if the birthday has already occurred this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--; // Decrease age if birthday hasn't occurred yet this year
    }


    const newCase = {
      ...formData,
      id: Date.now().toString(),
      age,
      status: "pending" as const,
      assignUnit: "Pending" as const,
    };

    addCase(newCase);

    toast({
      title: "Request Submitted",
      description: "Your request has been received. A case worker will contact you soon.",
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-lg animate-fadeIn">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Housing Request Form</h2>
            <Button variant="outline" onClick={() => navigate("/")}>
              Return Home
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number (if available)</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentLocation">Current Location</Label>
                  <Input
                    id="currentLocation"
                    value={formData.currentLocation}
                    onChange={handleChange}
                    placeholder="Where can we find you?"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="disability">Disability (optional)</Label>
                  <Input
                    id="disability"
                    value={formData.disability}
                    onChange={handleChange}
                    placeholder="Enter disability if any"
                  />
                </div>
                <div>
                  <Label htmlFor="veteranStatus">Are you a veteran?</Label>
                  <Select
                    value={formData.veteranStatus}
                    onValueChange={(value) => handleSelectChange("veteranStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="housingNeeds">
                    Specific Housing Needs (optional)
                  </Label>
                  <Input
                    id="housingNeeds"
                    value={formData.housingNeeds}
                    onChange={handleChange}
                    placeholder="Any specific requirements?"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="caseWorker">Preferred Case Worker</Label>
              <Select
                value={formData.caseWorker}
                onValueChange={(value) => handleSelectChange("caseWorker", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select case worker" />
                </SelectTrigger>
                <SelectContent>
                  {CASE_WORKERS.map((worker) => (
                    <SelectItem key={worker.id} value={worker.name}>
                      {worker.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Submit Request
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Request;
