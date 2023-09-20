import TipTap, { content, extensions } from "@/Components/Editor";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AppLayout from "@/Layouts/AppLayout";
import { Course, PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { JSONContent, useEditor } from "@tiptap/react";

export default function CreateCourse({
    auth,
    course,
}: PageProps<{ course: Course }>) {
    const { data, setData, processing, post, errors } = useForm<{
        name: string;
        content: JSONContent;
    }>({
        name: "",
        content: {},
    });

    const editor = useEditor({
        extensions: extensions,
        content: content,
        editorProps: {
            attributes: {
                class: "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl p-5 focus:outline-none border border-gray-400 rounded-lg",
            },
        },
        onUpdate: ({ editor }) => {
            setData("content", editor.getJSON());
        },
    });

    const handleSubmit = () => {
        if (editor) {
            post(
                route("module.store", {
                    course: course.slug,
                })
            );
        }
    };

    return (
        <AppLayout>
            <Head title="Create Module" />

            <div className="flex space-x-8 m-8">
                <Card className="w-[250px] h-full sticky top-8">
                    <CardHeader>Information</CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <Label>Module Name</Label>
                            <Input
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <Button onClick={handleSubmit} disabled={processing}>
                            Submit
                        </Button>
                    </CardContent>
                </Card>
                <div className="flex-1">
                    {editor && <TipTap editor={editor} />}
                </div>
            </div>
        </AppLayout>
    );
}
