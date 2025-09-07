import { Home, Search, BookOpen, Upload } from "lucide-react";

export function BottomNavigation() {
  const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Search, label: "Explore" },
    { icon: BookOpen, label: "Learn" },
    { icon: Upload, label: "Teach" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.label}
              className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
                item.active
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <IconComponent className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}