import TipTap, { extensions } from "@/Components/Editor";
import InputError from "@/Components/InputError";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AppLayout from "@/Layouts/AppLayout";
import { Course, Module, PageProps } from "@/types";
import { EROLE } from "@/types/enum";
import { Head, useForm } from "@inertiajs/react";
import { JSONContent, useEditor } from "@tiptap/react";
import { useState } from "react";

export default function DetailModule({
    auth,
    course,
    module,
}: PageProps<{
    course: Course;
    module: Module;
}>) {
    const {
        data,
        setData,
        processing,
        put,
        errors,
        isDirty,
        reset,
        setDefaults,
    } = useForm<{
        name: string;
        content: JSONContent;
    }>({
        name: module.name,
        content: module.content,
    });
    const [edit, setEdit] = useState(false);

    const editor = useEditor({
        extensions: extensions,
        content: data.content,
        editorProps: {
            attributes: {
                class: "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl p-5 focus:outline-none border border-gray-400 rounded-lg",
            },
        },
        editable: edit,
        onUpdate: ({ editor }) => {
            setData("content", editor.getJSON());
        },
    });

    const toggleEdit = () => {
        setEdit(!edit);
        if (editor) editor.setEditable(!edit);
    };

    const handleReset = () => {
        toggleEdit();
        reset("name", "content");
        if (editor) editor.commands.setContent(module.content);
    };

    const handleSubmit = () => {
        if (editor) {
            put(
                route("module.update", {
                    course: course.slug,
                    module: module.slug,
                }),
                {
                    onSuccess: () => {
                        toggleEdit();
                        setDefaults({
                            name: data.name,
                            content: data.content,
                        });
                    },
                }
            );
        }
    };

    return (
        <AppLayout>
            <Head title="Module Detail" />

            <div className="flex space-x-8 m-8">
                <div className="flex flex-col">
                    <div className="sticky top-8 space-y-4">
                        <Card className="w-[250px]">
                            <CardHeader>Information</CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    {!edit ? (
                                        module.name
                                    ) : (
                                        <>
                                            <Label>Module Name</Label>
                                            <Input
                                                name="name"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.name}
                                                className="mt-2"
                                            />
                                        </>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                        {(auth.role.name === EROLE.ADMINISTRATOR ||
                            (auth.role.name === EROLE.ASSISTANT &&
                                course.assistants.find(
                                    (ca) => ca.name === auth.user.name
                                ))) && (
                            <div className="w-full">
                                {!edit ? (
                                    <Button
                                        className="w-full"
                                        onClick={toggleEdit}
                                    >
                                        Edit
                                    </Button>
                                ) : (
                                    <div className="flex w-full space-x-2 justify-around">
                                        {isDirty ? (
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button className="w-full">
                                                        Cancel
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Are you absolutely
                                                            sure?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot
                                                            be undone. This will
                                                            permanently delete
                                                            your account and
                                                            remove your data
                                                            from our servers.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={
                                                                handleReset
                                                            }
                                                        >
                                                            Continue
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        ) : (
                                            <Button
                                                className="w-full"
                                                onClick={handleReset}
                                            >
                                                Cancel
                                            </Button>
                                        )}
                                        <Button
                                            className="w-full"
                                            variant="secondary"
                                            onClick={handleSubmit}
                                            disabled={!isDirty || processing}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex-1">
                    {editor && <TipTap editor={editor} />}
                </div>
            </div>
        </AppLayout>
    );
}
