import { RouteParamsWithQueryOverload, RouteParam } from "ziggy-js";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    email_verified_at: string;
}

export interface Role {
    id: string;
    name: string;
    display_name: string;
}

export interface Course {
    id: string;
    slug: string;
    name: string;
    description: string;
    assistants: User[];
    modules: Module[];
}

export interface Module {
    id: string;
    slug: string;
    name: string;
    content: Object;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
        role: Role;
        roles: Role[];
    };
};

export type FlashProps = {
    flash: {
        error: boolean;
        message: string;
    };
};

export interface LinkBreadCrumb {
    name: string;
    link: string;
    params?: RouteParamsWithQueryOverload | RouteParam | undefined;
}

export interface IBreadcrumb {
    title: string;
    url: string;
    is_current_page: boolean;
}
