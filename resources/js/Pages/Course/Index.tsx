import CourseCard from "@/Components/CourseCard";
import ScheduleCalendar from "@/Components/ScheduleCalendar";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import AppLayout from "@/Layouts/AppLayout";
import { Course, PageProps } from "@/types";
import { EROLE } from "@/types/enum";
import { Head, Link } from "@inertiajs/react";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export default function CourseIndex({
    auth,
    courses,
}: PageProps<{
    courses: Course[];
}>) {
    return (
        <AppLayout>
            <Head title="Courses" />

            <div className="flex flex-col lg:flex-row">
                <div className="flex-1">
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1 px-6 sm:px-0">
                                    <h2 className="text-2xl font-semibold tracking-tight">
                                        Courses List
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Top picks for you. Updated daily.
                                    </p>
                                </div>
                                {auth.role.name === EROLE.ADMINISTRATOR && (
                                    <div className="mx-4 sm:mx-0">
                                        <Link href={route("course.create")}>
                                            <Button className="space-x-2">
                                                <PlusCircledIcon />
                                                <span>Add</span>
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <Separator className="my-4" />
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-0">
                                {courses.length > 0 ? (
                                    courses.map((course) => (
                                        <Link
                                            key={course.id}
                                            href={route(
                                                "course.details",
                                                course.slug
                                            )}
                                        >
                                            <CourseCard
                                                key={course.id}
                                                course={course}
                                            />
                                        </Link>
                                    ))
                                ) : (
                                    <>No courses</>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="py-12">
                        <div className="mx-auto sm:px-6 lg:px-8 space-y-6">
                            <Card>
                                <CardHeader>Calendar</CardHeader>
                                <CardContent>
                                    <ScheduleCalendar />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
