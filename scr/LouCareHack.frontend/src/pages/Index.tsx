import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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


const Index = () => {
  const navigate = useNavigate();

  const handlePotentialResident = () => {
    navigate("/request");
  };

  const handlePotentialMain = () => {
    navigate("/dashboard");
  };

  const [formData, setFormData] = useState({
    userName: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    setTimeout(() => {
      navigate("/");
    }, 2000);
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-lg animate-fadeIn">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900">LouCare Log In</h1>
        
          </div>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="userName">Username</Label>
                  <Input
                    id="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    placeholder="Enter Username"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>
            </div>
            <Button variant="default"
            onClick={handlePotentialMain} className="w-full md:w-auto">
              Log In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
