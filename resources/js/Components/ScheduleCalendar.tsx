import { useState } from "react";
import { Calendar } from "./ui/calendar";

export default function ScheduleCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return <Calendar selected={date} onSelect={setDate} />;
}
