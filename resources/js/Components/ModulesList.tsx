import { Course, Module, Role, User } from "@/types";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";
import { EROLE } from "@/types/enum";

export default function ModulesList({
    course,
    user,
    role,
}: {
    course: Course;
    user: User;
    role: Role;
}) {
    return (
        <div className="flex flex-col space-y-4 py-4">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-xl">Modules List</h3>
                {(role.name === EROLE.ADMINISTRATOR ||
                    (role.name === EROLE.ASSISTANT &&
                        course.assistants.find(
                            (ca) => ca.name === user.name
                        ))) && (
                    <Link
                        href={route("module.create", {
                            course: course.slug,
                        })}
                    >
                        <Button>Add</Button>
                    </Link>
                )}
            </div>
            <Separator />
            {course.modules.length > 0 ? (
                course.modules.map((module) => (
                    <Link
                        key={module.id}
                        href={route("module.detail", {
                            course: course.slug,
                            module: module.slug,
                        })}
                    >
                        <div>{module.name}</div>
                    </Link>
                ))
            ) : (
                <span>No modules found.</span>
            )}
        </div>
    );
}
