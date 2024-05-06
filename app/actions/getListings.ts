import client from "@/app/libs/prismadb";

export default async function getListings() {
    try {
        const listings = await client.listing.findMany({
            orderBy: {
                createAt: "desc",
            },
        });

        return listings;
    } catch (error: any) {
        throw new Error(error);
    }
}
