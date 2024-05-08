import client from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavouriteListings() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return [];
        }

        const favourites = await client.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favouriteIds || [])],
                },
            },
        });

        const SafeFavourites = favourites.map((favourite) => ({
            ...favourite,
            createAt: favourite.createAt.toISOString(),
        }));

        return SafeFavourites;
    } catch (error: any) {
        throw new Error(error);
    }
}
