import { Star, Clock, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function CourseCard({
  title,
  instructor,
  rating,
  students,
  duration,
  price,
  image,
  level
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 left-2" variant="secondary">
          {level}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{instructor}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{students}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">{price}</span>
        </div>
      </CardContent>
    </Card>
  );
}