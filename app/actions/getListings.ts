import client from "@/app/libs/prismadb";
import { start } from "repl";

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    category?: string;
    locationValue?: string;
}

export default async function getListings(params: IListingsParams) {
    try {
        const {
            userId,
            roomCount,
            guestCount,
            bathroomCount,
            locationValue,
            startDate,
            endDate,
            category,
        } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }

        if (roomCount) {
            query.roomCount = { gte: +roomCount };
        }

        if (guestCount) {
            query.guestCount = { gte: +guestCount };
        }

        if (bathroomCount) {
            query.bathroomCount = { gte: +bathroomCount };
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate },
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate },
                            },
                        ],
                    },
                },
            };
        }

        const listings = await client.listing.findMany({
            where: query,
            orderBy: {
                createAt: "desc",
            },
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createAt: listing.createAt.toISOString(),
        }));

        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }
}
