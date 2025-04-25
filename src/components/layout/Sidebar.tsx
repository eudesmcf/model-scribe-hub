
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  BarChart3, 
  Clock, 
  FileText, 
  Folder, 
  History, 
  Home, 
  LayoutDashboard, 
  Menu, 
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  expanded: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon: Icon, label, expanded, onClick }: NavItemProps) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => cn(
        "flex items-center py-2 px-3 my-1 rounded-md transition-colors relative group",
        expanded ? "justify-start" : "justify-center",
        isActive 
          ? "bg-tabular-blue text-white font-medium" 
          : "text-gray-600 hover:bg-gray-100"
      )}
      onClick={onClick}
    >
      <Icon className={cn("h-5 w-5", expanded ? "mr-3" : "")} />
      {expanded ? (
        <span>{label}</span>
      ) : (
        <div className="absolute left-full ml-2 rounded px-2 py-1 bg-gray-900 text-white text-xs z-50 invisible opacity-0 -translate-x-3 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 transition-all">
          {label}
        </div>
      )}
    </NavLink>
  );
};

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className={cn(
      "border-r bg-gray-50 h-screen flex flex-col transition-all duration-300",
      expanded ? "w-64" : "w-16"
    )}>
      <div className="flex justify-end p-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setExpanded(!expanded)}
          className="text-gray-600 hover:bg-gray-100"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 py-4 px-2 space-y-6 overflow-y-auto">
        <div>
          <p className={cn(
            "text-xs font-medium text-gray-400 mb-1",
            expanded ? "pl-3" : "text-center"
          )}>
            {expanded ? "MAIN" : "•"}
          </p>
          <nav>
            <NavItem to="/" icon={LayoutDashboard} label="Dashboard" expanded={expanded} />
            <NavItem to="/models" icon={Folder} label="Models" expanded={expanded} />
            <NavItem to="/sessions" icon={Clock} label="Sessions" expanded={expanded} />
            <NavItem to="/documentation" icon={FileText} label="Documentation" expanded={expanded} />
            <NavItem to="/history" icon={History} label="Change History" expanded={expanded} />
          </nav>
        </div>
        
        <div>
          <p className={cn(
            "text-xs font-medium text-gray-400 mb-1",
            expanded ? "pl-3" : "text-center"
          )}>
            {expanded ? "INSIGHTS" : "•"}
          </p>
          <nav>
            <NavItem to="/analytics" icon={BarChart3} label="Analytics" expanded={expanded} />
            <NavItem to="/reports" icon={Home} label="Reports" expanded={expanded} />
          </nav>
        </div>
      </div>
      
      <div className="p-2 border-t">
        <NavItem to="/settings" icon={Settings} label="Settings" expanded={expanded} />
      </div>
    </aside>
  );
};

export default Sidebar;
