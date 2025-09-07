import { Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RoleSelectionDialog } from "./RoleSelectionDialog";
import { useState } from "react";

export function Header() {
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center px-4">
        
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2 mr-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold">S</span>
          </div>
          <h1 className="font-bold text-xl">StudyBridge</h1>
        </div>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search courses, topics..." 
              className="pl-10 bg-input-background"
            />
          </div>
        </div>
        
        {/* Auth Buttons */}
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden sm:inline-flex"
            onClick={() => setRoleDialogOpen(true)}
          >
            Login
          </Button>
          <Button 
            size="sm" 
            className="hidden sm:inline-flex"
            onClick={() => setRoleDialogOpen(true)}
          >
            Get Started
          </Button>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="sm:hidden"
            onClick={() => setRoleDialogOpen(true)}
          >
            <User className="h-4 w-4" />
          </Button>
        </div>
        
        <RoleSelectionDialog 
          open={roleDialogOpen} 
          onOpenChange={setRoleDialogOpen} 
        />
      </div>
    </header>
  );
}