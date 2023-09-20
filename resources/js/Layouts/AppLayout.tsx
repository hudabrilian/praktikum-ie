import Breadcrumb from "@/Components/Breadcrumb";
import Footer from "@/Components/Footer";
import Logo from "@/Components/Logo";
import { MainNav } from "@/Components/MainNav";
import { ModeToggle } from "@/Components/ModeToggle";
import RoleSwitcher from "@/Components/RoleSwitcher";
import { Search } from "@/Components/SearchBar";
import { UserNav } from "@/Components/UserNav";
import { Toaster } from "@/Components/ui/toaster";

import { toast } from "@/Components/ui/use-toast";
import { FlashProps, PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useEffect } from "react";

export default function AppLayout({
    header,
    children,
}: PropsWithChildren<{
    header?: ReactNode;
}>) {
    const { auth, flash } = usePage<PageProps<FlashProps>>().props;

    useEffect(() => {
        if (flash && flash.message) {
            if (flash.error) {
                toast({
                    title: "Something went wrong",
                    description: flash.message,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Information",
                    description: flash.message,
                });
            }
        }
    }, [flash]);

    return (
        <>
            <div className="flex-col flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <Logo />
                        <RoleSwitcher
                            activeRole={auth.role}
                            roles={auth.roles}
                        />
                        <MainNav className="mx-6" />
                        <div className="ml-auto flex items-center space-x-4">
                            <Search className="hidden md:flex" />
                            <UserNav user={auth.user} />
                            <ModeToggle />
                        </div>
                    </div>
                </div>
                <main>
                    <div className="flex-1">
                        <div className="dark:bg-gray-800 border-b px-8 py-4">
                            <Breadcrumb />
                        </div>
                        {children}
                    </div>
                </main>
                <Footer />
                <Toaster />
            </div>
        </>
    );
}
