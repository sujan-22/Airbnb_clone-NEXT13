import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteListings from "../actions/getFavouriteListings";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import ReservationClient from "../reservations/ReservationClient";
import FavouritesClient from "./FavouritesClient";

const ListingPage = async () => {
    const currentUser = await getCurrentUser();
    const listings = await getFavouriteListings();

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No Favourite found"
                    subtitle="Looks like you have no favourite listings."
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <FavouritesClient listings={listings} currentUser={currentUser} />
        </ClientOnly>
    );
};

export default ListingPage;
