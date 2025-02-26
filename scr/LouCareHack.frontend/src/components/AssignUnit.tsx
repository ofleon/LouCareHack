
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

interface AssignUnitProps {
    assignUnit: "Waiting" | "Assigned";
    className?: string;
    onAssignUnitChange?: (newAssignUnit:  "Waiting" | "Assigned") => void;
    isEditable?: boolean;
}

const AssignUnit = ({ assignUnit, className, onAssignUnitChange, isEditable = false }: AssignUnitProps) => {
  const getAssignUnitColor = (assignUnit: string) => {
    switch (assignUnit) {
      case "Waiting":
        return "bg-status-progress text-white";
      case "Assigned":
        return "bg-status-completed text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };
  
if (isEditable && onAssignUnitChange) {
    return (
      <Select value={assignUnit} onValueChange={onAssignUnitChange}>
        <SelectTrigger className={cn(
          "w-[120px] h-[30px]",
          getAssignUnitColor(assignUnit)
        )}>
          <SelectValue>{assignUnit}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Waiting">Waiting</SelectItem>
          <SelectItem value="Assigned">Assigned</SelectItem>
        </SelectContent>
      </Select>
    );
  }

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-sm font-medium animate-fadeIn",
        getAssignUnitColor(assignUnit),
        className
      )}
    >
      {assignUnit}
    </span>
  );
};

export default AssignUnit;
