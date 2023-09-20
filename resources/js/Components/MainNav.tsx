import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import NavLink from "./NavLink";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <nav
            className={cn(
                "flex items-center space-x-4 lg:space-x-6",
                className
            )}
            {...props}
        >
            <NavLink
                href={route("dashboard")}
                active={route().current("dashboard")}
            >
                Dashboard
            </NavLink>
            <NavLink
                href={route("course.index")}
                active={
                    route().current("course.*") || route().current("module.*")
                }
            >
                Course
            </NavLink>
        </nav>
    );
}
