import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Link } from "@inertiajs/react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        route: string;
        title: string;
    }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
    return (
        <nav
            className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 sticky top-8",
                className
            )}
            {...props}
        >
            {items.map((item) => (
                <Link
                    key={item.route}
                    href={route(item.route)}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        route().current(item.route)
                            ? "bg-muted hover:bg-muted"
                            : "hover:bg-transparent hover:underline",
                        "justify-start"
                    )}
                >
                    {item.title}
                </Link>
            ))}
        </nav>
    );
}
