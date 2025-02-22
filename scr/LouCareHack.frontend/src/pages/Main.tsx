import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  
  const handlePotentialLogin = () => {
    navigate("/index");
  };

  const handlePotentialResident = () => {
    navigate("/request");
  };

  const handleCaseWorker = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full text-center space-y-8 animate-fadeIn">
        <h1 className="text-4xl font-bold text-gray-900">LouCare Homepage</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Helping Louisville house its unhoused residents through innovative
          solutions and dedicated case management.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            onClick={handlePotentialResident}
            className="bg-primary text-white px-8 py-6 text-lg rounded-lg hover:bg-primary/90 transition-colors"
          >
            Submit Request
          </Button>
          <Button
            onClick={handlePotentialLogin}
            variant="outline"
            className="border-2 px-8 py-6 text-lg rounded-lg hover:bg-accent transition-colors"
          >
            Dashboard: Log In
          </Button>
        </div>
        
      </div>
    </div>
  );
};

export default Main;
