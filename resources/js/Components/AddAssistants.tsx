import { FormEvent, FormEventHandler, useState } from "react";
import { Dialog } from "./ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2Icon, SearchIcon } from "lucide-react";
import { router, usePage } from "@inertiajs/react";
import { Course, PageProps } from "@/types";
import { PlusIcon } from "@radix-ui/react-icons";
import { toast } from "./ui/use-toast";
import InputError from "./InputError";

export default function AddAssistantsButton({ course }: { course: Course }) {
    const [open, setOpen] = useState(false);
    const [searchUsername, setSearchUsername] = useState("");
    const [loading, setLoading] = useState(false);
    // const [users, setUsers] = useState<string[]>([]);

    const { errors } = usePage().props;

    const submitHandler: FormEventHandler = (e) => {
        e.preventDefault();

        if (!searchUsername) return;

        setLoading(true);

        router.post(
            route("course.addAssistant", {
                course: course.slug,
            }),
            {
                assistant: searchUsername,
            },
            {
                onFinish: () => {
                    setSearchUsername("");
                    setLoading(false);
                },
            }
        );
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button className="w-full">Add</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form onSubmit={submitHandler}>
                    <div className="flex space-x-2 items-center">
                        <Input
                            placeholder="Username..."
                            value={searchUsername}
                            onChange={(e) => setSearchUsername(e.target.value)}
                            disabled={loading}
                            autoFocus
                        />
                        <Button
                            variant="outline"
                            type="submit"
                            disabled={loading || !searchUsername}
                        >
                            {/* <SearchIcon /> */}
                            {loading ? (
                                <Loader2Icon className="h-4 w-4 animate-spin" />
                            ) : (
                                <PlusIcon />
                            )}
                        </Button>
                    </div>
                </form>
                <InputError message={errors.assistants} className="mt-2" />
                {/* <div className="mt-4 space-y-2">
                    {users.map((user) => (
                        <Button variant="ghost" className="w-full">
                            {user}
                        </Button>
                    ))}
                </div> */}
            </PopoverContent>
        </Popover>
    );
}
