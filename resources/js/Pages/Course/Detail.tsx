import AddAssistantsButton from "@/Components/AddAssistants";
import AssistantName from "@/Components/AssistantName";
import ModulesList from "@/Components/ModulesList";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import AppLayout from "@/Layouts/AppLayout";
import { Course, IBreadcrumb, PageProps } from "@/types";
import { EROLE } from "@/types/enum";
import { Head } from "@inertiajs/react";

export default function CourseDetail({
    auth,
    course,
}: PageProps<{ course: Course }>) {
    return (
        <AppLayout>
            <Head title="Course" />

            <div className="flex flex-col-reverse md:flex-row w-full justify-center py-6 px-12 md:space-x-8">
                <div className="flex flex-col space-y-6 md:w-1/4 mt-4 md:mt-0">
                    <div>
                        <Card>
                            <CardHeader>Information</CardHeader>
                            <CardContent>
                                <h1>{course.name}</h1>
                                <p className="whitespace-break-spaces">
                                    {course.description}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>Assistants</CardHeader>
                            <CardContent>
                                <div className="">
                                    {course.assistants.length > 0 ? (
                                        course.assistants.map((assistant) => (
                                            <AssistantName
                                                role={auth.role}
                                                course={course}
                                                assistant={assistant}
                                                key={assistant.id}
                                            />
                                        ))
                                    ) : (
                                        <>No assistants</>
                                    )}
                                    <div className="mt-4">
                                        {auth.role.name ===
                                            EROLE.ADMINISTRATOR && (
                                            <AddAssistantsButton
                                                course={course}
                                            />
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    {auth.role.name === EROLE.ASSISTANT &&
                        course.assistants.find(
                            (ca) => ca.name === auth.user.name
                        ) && <Button>Test</Button>}
                </div>
                <div className="md:flex-1">
                    <Card>
                        <CardContent>
                            <ModulesList
                                user={auth.user}
                                role={auth.role}
                                course={course}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
