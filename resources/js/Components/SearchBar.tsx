import { Input } from "./ui/input";

export function Search({ ...props }) {
    return (
        <div {...props}>
            <Input
                type="search"
                placeholder="Search..."
                className="md:w-[100px] lg:w-[300px]"
            />
        </div>
    );
}
