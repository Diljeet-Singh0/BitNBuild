import { Upload, DollarSign, Users, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { RoleSelectionDialog } from "./RoleSelectionDialog";
import { useState } from "react";

export function TeacherSection() {
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);

  const benefits = [
    {
      icon: Upload,
      title: "Easy Course Upload",
      description: "Upload your courses with our simple, intuitive interface"
    },
    {
      icon: DollarSign,
      title: "Earn Money",
      description: "Set your own prices and earn from your expertise"
    },
    {
      icon: Users,
      title: "Reach Students",
      description: "Connect with thousands of eager learners worldwide"
    },
    {
      icon: Star,
      title: "Build Your Brand",
      description: "Establish yourself as an expert in your field"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1594256347468-5cd43df8fbaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwaW5zdHJ1Y3RvciUyMHRlYWNoaW5nJTIwY2xhc3N8ZW58MXx8fHwxNzU3MTY4MTIwfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Teacher instructing students"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          
          <div className="flex-1 text-center lg:text-left">
            <h2 className="font-bold text-3xl lg:text-4xl mb-4">
              Share Your Knowledge, Earn Income
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Turn your expertise into engaging online courses and help students around the world learn new skills.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <Card key={index} className="text-left">
                    <CardContent className="p-4">
                      <IconComponent className="h-6 w-6 text-green-600 mb-2" />
                      <h4 className="font-semibold mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <Button 
              size="lg" 
              className="px-8 bg-green-600 hover:bg-green-700"
              onClick={() => setRoleDialogOpen(true)}
            >
              Start Teaching Today
            </Button>
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