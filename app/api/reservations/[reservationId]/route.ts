import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
    reservationId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== "string") {
        throw new Error("Invalid reservation ID");
    }

    const reservation = await client.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                {
                    userId: currentUser.id,
                },
                {
                    listing: { userId: currentUser.id },
                },
            ],
        },
    });

    return NextResponse.json(reservation);
}
