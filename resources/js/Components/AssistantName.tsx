import { Course, Role, User } from "@/types";
import { Button } from "./ui/button";
import { EROLE } from "@/types/enum";
import { router } from "@inertiajs/react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function AssistantName({
    role,
    course,
    assistant,
}: {
    role: Role;
    course: Course;
    assistant: User;
}) {
    const [loading, setLoading] = useState(false);

    return (
        <div className="flex items-center dark:hover:bg-gray-800 hover:bg-gray-300 rounded-xl">
            {role.name === EROLE.ADMINISTRATOR && (
                <Button
                    variant="ghost"
                    className="p-0 h-4"
                    disabled={loading}
                    onClick={() => {
                        router.post(
                            route("course.removeAssistant", {
                                course: course.slug,
                            }),
                            {
                                assistant: assistant.username,
                            },
                            {
                                onBefore: () => setLoading(true),
                                onFinish: () => setLoading(false),
                            }
                        );
                    }}
                >
                    <CrossCircledIcon />
                </Button>
            )}
            <span className="pl-2">{assistant.name}</span>
        </div>
    );
}
