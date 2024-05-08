"use client";

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservations, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface Props {
    currentUser?: SafeUser | null;
    reservations: SafeReservations[];
}

const ReservationClient: React.FC<Props> = ({ currentUser, reservations }) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onCancel = useCallback(
        (id: string) => {
            setDeletingId(id);

            axios
                .delete(`/api/reservations/${id}`)
                .then(() => {
                    toast.success("Reservation cancelled");
                    router.refresh();
                })
                .catch(() => {
                    toast.error("Something went wrong");
                })
                .finally(() => {
                    setDeletingId("");
                });
        },
        [router]
    );

    return (
        <Container>
            <Heading
                title="Reservations"
                subtitle="Booking on your properties"
            />
            <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((reservation) => {
                    return (
                        <ListingCard
                            key={reservation.id}
                            currentUser={currentUser}
                            reservation={reservation}
                            data={reservation.listing}
                            actionId={reservation.id}
                            onAction={onCancel}
                            disabled={deletingId === reservation.id}
                            actionLabel="Cancel guest reservation"
                        />
                    );
                })}
            </div>
        </Container>
    );
};

export default ReservationClient;
