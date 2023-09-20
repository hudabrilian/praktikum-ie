import { IBreadcrumb, LinkBreadCrumb, PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";

export default function Breadcrumb() {
    const { breadcrumbs } =
        usePage<PageProps<{ breadcrumbs: IBreadcrumb[] }>>().props;

    return (
        <div className="flex">
            {breadcrumbs.map((page, index) => (
                <div key={index}>
                    {index !== 0 && <span className="mx-2">{">"}</span>}

                    {index === breadcrumbs.length - 1 ? (
                        <span>{page.title}</span>
                    ) : (
                        <Link href={page.url}>{page.title}</Link>
                    )}
                </div>
            ))}
        </div>
    );
}
