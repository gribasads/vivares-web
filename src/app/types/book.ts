export type Status = "pending" | "approved" | "rejected";

export interface Book {
    placeId: string;
    userId: string;
    dateHour: Date;
    guests: string[];
    reason: string;
}
