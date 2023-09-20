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
import { useEffect, useState } from "react";

export default function Dashboard({
    auth,
    courses,
}: PageProps<{ courses: Course[] }>) {
    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="flex flex-col lg:flex-row">
                <div className="flex-1">
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1 px-6 sm:px-0">
                                    <h2 className="text-2xl font-semibold tracking-tight">
                                        Dashboard
                                    </h2>
                                </div>
                            </div>
                            <Separator className="my-4" />
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
