
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

const Request = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Submitted",
      description: "Your request has been received. Please return to the home page.",
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
                  <Input id="firstName" placeholder="Enter first name" required />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter last name" required />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" required />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number (if available)</Label>
                  <Input id="phoneNumber" placeholder="Enter phone number" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentLocation">Current Location</Label>
                  <Input
                    id="currentLocation"
                    placeholder="Where can we find you?"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="disability">Disability (optional)</Label>
                  <Input id="disability" placeholder="Enter disability if any" />
                </div>
                <div>
                  <Label htmlFor="veteranStatus">Are you a veteran?</Label>
                  <Select>
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
                    placeholder="Any specific requirements?"
                  />
                </div>
              </div>
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
