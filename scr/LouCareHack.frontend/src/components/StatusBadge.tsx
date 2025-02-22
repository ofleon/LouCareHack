
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "In Progress" | "Not Submitted" | "Completed";
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-status-progress text-white";
      case "Completed":
        return "bg-status-completed text-white";
      case "Not Submitted":
        return "bg-status-pending text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

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
