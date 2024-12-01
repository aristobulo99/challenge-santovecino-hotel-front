import { Reservation, RoomReservation } from "./reservation.interfaces";

export interface ReservationState {
    roomReservation: RoomReservation[];
    reservations: Reservation[];
    loading: boolean;
    falid: string;
}