import client from "../libs/prismadb";

interface IParams {
    listingId?: string;
}

export default async function getListingById(params: IParams) {
    try {
        const { listingId } = params;
        const listing = await client.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                user: true,
            },
        });

        if (!listing) {
            return null;
        }

        return {
            ...listing,
            createAt: listing.createAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updateAt: listing.user.updateAt.toISOString(),
                emailVerified:
                    listing.user.emailVerified?.toISOString() || null,
            },
        };
    } catch (error: any) {
        throw new Error(error);
    }
}
