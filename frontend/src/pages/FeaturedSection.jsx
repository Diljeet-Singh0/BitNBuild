import { CourseCard } from "./CourseCard";

export function FeaturedSection() {
  const courses = [
    {
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      rating: 4.8,
      students: 12500,
      duration: "40h",
      price: "$89",
      image: "https://images.unsplash.com/photo-1635775017492-1eb935a082a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBjb21wdXRlcnxlbnwxfHx8fDE3NTcxNjc3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      level: "Beginner"
    },
    {
      title: "Digital Marketing Mastery",
      instructor: "Mike Chen",
      rating: 4.6,
      students: 8400,
      duration: "25h",
      price: "$69",
      image: "https://images.unsplash.com/photo-1707301280389-32a15e3fedf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hcmtldGluZyUyMGRpZ2l0YWx8ZW58MXx8fHwxNzU3MTE3MzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      level: "Intermediate"
    }
  ];

  return (
    <section className="py-8">
      <div className="container px-4">
        <h2 className="font-bold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
}