import { ReactNode } from "react";
import { cn } from "../../../../lib/utils";
interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  description,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4",
        className,
      )}
    >
      <div className="flex-1">
        <h3 className="text-sm text-muted-foreground font-medium mb-1">
          {title}
        </h3>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="text-primary bg-primary/10 p-2 rounded-md">{icon}</div>
    </div>
  );
}
