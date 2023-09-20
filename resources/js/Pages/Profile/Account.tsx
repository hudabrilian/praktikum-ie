import AppLayout from "@/Layouts/AppLayout";
import { PageProps } from "@/types";
import SettingsLayout from "./Layout";
import { Head } from "@inertiajs/react";

export default function Edit({ auth }: PageProps) {
    return (
        <AppLayout>
            <Head title="Accounts" />

            <div className="p-2 space-y-6">
                <SettingsLayout>
                    <div className="mx-auto sm:px-6 lg:px-8 space-y-6 w-full">
                        Account page
                    </div>
                </SettingsLayout>
            </div>
        </AppLayout>
    );
}
