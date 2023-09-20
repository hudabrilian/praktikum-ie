import { cn } from "@/lib/utils";
import { Role } from "@/types";
import { router } from "@inertiajs/react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, useState } from "react";
import { Button } from "./ui/button";
import { Dialog } from "./ui/dialog";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useToast } from "./ui/use-toast";
import { Loader, Loader2Icon, LoaderIcon } from "lucide-react";

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface RoleSwitcherProps extends PopoverTriggerProps {
    activeRole: Role;
    roles: Role[];
}

export default function RoleSwitcher({
    activeRole,
    roles,
    className,
}: RoleSwitcherProps) {
    const [open, setOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role>(activeRole);
    const [loading, setLoading] = useState(false);

    const { toast } = useToast();

    return (
        <Dialog>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger disabled={loading} asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        aria-label="Select a team"
                        className={cn(
                            "w-[200px] sm:flex hidden",
                            loading ? "justify-center" : "justify-between",
                            className
                        )}
                    >
                        {loading ? (
                            <Loader2Icon className="h-4 w-4 shrink-0 opacity-50 animate-spin" />
                        ) : (
                            <>
                                {selectedRole.display_name}
                                <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                            </>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandList>
                            {/* <CommandInput placeholder="Search roles..." /> */}
                            <CommandEmpty>No role found.</CommandEmpty>
                            <CommandGroup key="Roles" heading="Roles">
                                {roles.map((role) => (
                                    <CommandItem
                                        key={role.id}
                                        onSelect={() => {
                                            if (role.id !== activeRole.id) {
                                                router.put(
                                                    route("profile.role"),
                                                    {
                                                        role: role.id,
                                                    },
                                                    {
                                                        preserveScroll: true,
                                                        onSuccess: () => {
                                                            toast({
                                                                title: "Role successfully changed",
                                                            });
                                                            setLoading(false);
                                                            setSelectedRole(
                                                                role
                                                            );
                                                        },
                                                        onStart: () => {
                                                            setLoading(true);
                                                        },
                                                    }
                                                );
                                            }
                                            setOpen(false);
                                        }}
                                        className="text-sm"
                                    >
                                        {role.display_name}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                selectedRole.id === role.id
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </Dialog>
    );
}
