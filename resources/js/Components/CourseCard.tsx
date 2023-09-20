import { Course } from "@/types";
import { Card, CardContent, CardHeader } from "./ui/card";

type CourseCardProps = {
    course: Course;
};

export default function CourseCard({ course, ...props }: CourseCardProps) {
    return (
        <Card
            className="hover:shadow-xl transition-all hover:border-indigo-800 hover:cursor-pointer w-full"
            {...props}
        >
            <div className="overflow-hidden rounded-md mb-4">
                <div className="h-[200px] sm:w-[600px] object-cover transition-all hover:scale-105 bg-gradient-to-r from-cyan-800 to-indigo-800"></div>
            </div>
            <CardContent>
                <h2 className="font-bold text-lg">{course.name}</h2>
                <h3 className="text-sm line-clamp-3">{course.description}</h3>
            </CardContent>
        </Card>
    );
}
