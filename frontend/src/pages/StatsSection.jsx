import { Users, BookOpen, Award, Globe } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Active Students"
    },
    {
      icon: BookOpen,
      value: "1,200+",
      label: "Courses Available"
    },
    {
      icon: Award,
      value: "850+",
      label: "Expert Teachers"
    },
    {
      icon: Globe,
      value: "120+",
      label: "Countries Reached"
    }
  ];

  return (
    <section className="py-12 bg-primary text-primary-foreground">
      <div className="container px-4">
        <div className="text-center mb-8">
          <h2 className="font-bold text-3xl mb-2">Trusted by Thousands</h2>
          <p className="text-primary-foreground/80">
            Join our growing community of learners and teachers
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <IconComponent className="h-8 w-8 mx-auto mb-2 text-primary-foreground/80" />
                <div className="font-bold text-2xl mb-1">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}