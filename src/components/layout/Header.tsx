
import { Bell, Database, HelpCircle, Search, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center gap-2 font-semibold text-lg mr-8">
          <Database className="h-5 w-5 text-tabular-blue" />
          <span>Tabular Session Manager</span>
        </div>
        
        <div className="flex-1 flex items-center justify-between">
          <div className="hidden md:flex w-full max-w-sm items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search models, sessions..."
                className="pl-8 bg-muted/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Help"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost" 
              size="icon"
              className="rounded-full h-8 w-8 ml-2"
              aria-label="User Profile"
            >
              <div className="h-8 w-8 rounded-full bg-tabular-blue/90 flex items-center justify-center text-white font-semibold">
                <User className="h-4 w-4" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
