import { LinkBreadCrumb } from "@/Components/Breadcrumb";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import { Textarea } from "@/Components/ui/textarea";
import AppLayout from "@/Layouts/AppLayout";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function CreateCourse({ auth }: PageProps) {
    const links: LinkBreadCrumb[] = [
        {
            name: "Dashboard",
            link: "dashboard",
        },
        {
            name: "Create course",
            link: "course.create",
        },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("course.store"));
    };

    return (
        <AppLayout links={links}>
            <Head title="Create Course" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1 px-6 sm:px-0">
                            <h2 className="text-2xl font-semibold tracking-tight">
                                Create New Course
                            </h2>
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <div>
                        <Card className="max-w-5xl">
                            <CardContent>
                                <form
                                    onSubmit={submit}
                                    className="space-y-4 pt-4"
                                >
                                    <div>
                                        <Label htmlFor="name">Name</Label>

                                        <Input
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            autoComplete="course-name"
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />

                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="description">
                                            Description
                                        </Label>

                                        <Textarea
                                            id="description"
                                            name="description"
                                            value={data.description}
                                            className="mt-1 block w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.description}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Button type="submit">Submit</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
