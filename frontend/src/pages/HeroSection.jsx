import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { RoleSelectionDialog } from "./RoleSelectionDialog";
import { useState } from "react";

export function HeroSection() {
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  
  return (
    <section className="py-12 bg-gradient-to-br from-primary/5 to-accent/30">
      <div className="container px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="font-bold text-3xl lg:text-5xl mb-4">
              Bridge the Gap Between Learning & Teaching
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-lg">
              Whether you want to learn new skills or share your expertise, StudyBridge connects students and teachers in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="px-8"
                onClick={() => setRoleDialogOpen(true)}
              >
                Join as Student
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8"
                onClick={() => setRoleDialogOpen(true)}
              >
                Teach on StudyBridge
              </Button>
            </div>
          </div>
          <div className="flex-1 max-w-md">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1753613648191-4771cf76f034?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbiUyMHN0dWRlbnRzfGVufDF8fHx8MTc1NzEzNjM3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Students learning online"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      
      <RoleSelectionDialog 
        open={roleDialogOpen} 
        onOpenChange={setRoleDialogOpen} 
      />
    </section>
  );
}