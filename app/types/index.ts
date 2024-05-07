import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createAt"> & {
    createAt: string;
};

export type SafeReservations = Omit<
    Reservation,
    "startDate" | "createAt" | "endDate" | "listing"
> & {
    startDate: string;
    createAt: string;
    endDate: string;
    listing: SafeListing;
};

export type SafeUser = Omit<
    User,
    "createdAt" | "updateAt" | "emailVerified"
> & {
    createdAt: string;
    updateAt: string;
    emailVerified: string | null;
};
