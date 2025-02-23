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
import { Case } from "@/types/case";

const Request = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addCase } = useCases();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    condition: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newCase: Case = {
      userId: Date.now().toString(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      doB: new Date().toISOString(),
      phoneNumber: formData.phoneNumber || null,
      email: formData.email,
      gender: formData.gender,
      isActive: true,
      createAt: new Date().toISOString(),
      condition: {
        id: "1",
        name: formData.condition
      },
      conditionId: "1",
      contactId: null,
      contact: null,
      user: null
    };

    try {
      addCase(newCase);

      toast({
        title: "Request Submitted",
        description: "Your request has been received and will be reviewed shortly.",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error('Error submitting case:', error);
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-lg animate-fadeIn">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">New Case Form</h2>
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
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
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange("gender", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="condition">Medical Condition</Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) => handleSelectChange("condition", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cancer">Cancer</SelectItem>
                      <SelectItem value="Terminal Illness">Terminal Illness</SelectItem>
                      <SelectItem value="Chronic Medical Condition">Chronic Medical Condition</SelectItem>
                      <SelectItem value="Physical Disability">Physical Disability</SelectItem>
                      <SelectItem value="Mental Health Condition">Mental Health Condition</SelectItem>
                      <SelectItem value="Elderly">Elderly</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <Button type="submit" className="w-full md:w-auto">
                Submit Case
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Request;
