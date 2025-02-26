import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StatusBadgeProps {
  status: "Pending" | "Enrolled" | "Closed";
  className?: string;
  onStatusChange?: (newStatus: "Pending" | "Enrolled" | "Closed") => void;
  isEditable?: boolean;
}

const StatusBadge = ({ status, className, onStatusChange, isEditable = false }: StatusBadgeProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-status-pending text-white";
      case "Enrolled":
        return "bg-status-progress text-white";
      case "Closed":
        return "bg-status-completed text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  if (isEditable && onStatusChange) {
    return (
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className={cn(
          "w-[120px] h-[30px]",
          getStatusColor(status)
        )}>
          <SelectValue>{status}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Enrolled">Enrolled</SelectItem>
          <SelectItem value="Closed">Closed</SelectItem>
        </SelectContent>
      </Select>
    );
  }

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-sm font-medium animate-fadeIn",
        getStatusColor(status),
        className
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
