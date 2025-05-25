type Status = "pending" | "approved" | "rejected";

export interface BookingList {
    id: number;
    local: string;
    dateHour: string | Date;
    status: Status;
    name: string;
    apartment: string;
}
