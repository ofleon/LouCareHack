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
import { createApplicant } from "@/services/applicantService";

export interface RequestFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  condition: string;
  age: string;
  location: string;
}

const Request = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<RequestFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    condition: "",
    age: "",
    location: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newApplicant = {
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
      await createApplicant(newApplicant);

      // Store the new applicant in localStorage for the demo
      const dashboardApplicant = {
        userId: Date.now().toString(), // Generate a unique ID
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: parseInt(formData.age) || 25,
        location: formData.location || "Louisville",
        caseWorker: "Unassigned", // New applicants start unassigned
        assignedUnit: "Waiting",
        status: "Open"
      };

      // Get existing stored applicants or initialize empty array
      const storedApplicants = JSON.parse(localStorage.getItem('demoApplicants') || '[]');
      storedApplicants.push(dashboardApplicant);
      localStorage.setItem('demoApplicants', JSON.stringify(storedApplicants));

      toast({
        title: "Request Submitted",
        description: "Your request has been received and will be reviewed shortly.",
      });

      setTimeout(() => {
        navigate("/");
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
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Age *
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    required
                    min="18"
                    max="120"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={formData.age}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Current Location *
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    placeholder="Neighborhood or area in Louisville"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender *
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="condition"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Medical Condition (if any)
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={formData.condition}
                    onChange={handleInputChange}
                  >
                    <option value="">None</option>
                    <option value="Cancer">Cancer</option>
                    <option value="Terminal Illness">Terminal Illness</option>
                    <option value="Physical Disability">Physical Disability</option>
                    <option value="Mental Health">Mental Health</option>
                    <option value="Chronic Medical Condition">Chronic Medical Condition</option>
                    <option value="Elderly">Elderly</option>
                    <option value="Other">Other</option>
                  </select>
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
