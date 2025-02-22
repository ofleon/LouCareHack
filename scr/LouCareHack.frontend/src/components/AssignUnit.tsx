
import { cn } from "@/lib/utils";

interface AssignUnitProps {
    assignUnit: "Pending" | "Assigned";
    className?: string;
}

const  AssignUnit = ({ assignUnit, className }: AssignUnitProps) => {
  const getStatusColor = (unit: string) => {
    switch (assignUnit) {
      case "Pending":
        return "bg-status-progress text-white";
      case "Assigned":
        return "bg-status-completed text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-sm font-medium animate-fadeIn",
        getStatusColor(assignUnit),
        className
      )}
    >
      {assignUnit}
    </span>
  );
};

export default AssignUnit;
