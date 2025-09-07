import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { GraduationCap, Users, BookOpen, Upload } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function RoleSelectionDialog({ open, onOpenChange }) {
  const handleRoleSelect = (role) => {
    console.log(`Selected role: ${role}`);
    // Handle the role selection and routing
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            How do you want to use StudyBridge?
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/50"
            onClick={() => handleRoleSelect("student")}
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">I'm a Student</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn from expert instructors and advance your skills
                  </p>
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-3 w-3" />
                    <span>1000+ Courses</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>Expert Teachers</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/50"
            onClick={() => handleRoleSelect("teacher")}
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">I'm a Teacher</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your expertise and earn by teaching students
                  </p>
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Upload className="h-3 w-3" />
                    <span>Upload Courses</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>Reach Students</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}