import { createAction, props } from "@ngrx/store";
import { Reservation, RoomReservation } from "../../core/interfaces/reservation.interfaces";


export const getReservationByUserIdReques = createAction(
    "[Reservation] get Reservation By UserId Request",
    props<{userId: string}>()
);

export const getReservationByUserIdSuccesss = createAction(
    "[Reservation] get Reservation By UserId Success",
    props<{reservations: Reservation[]}>()
);

export const faildReservation = createAction(
    "[Reservation] faild Reservation",
    props<{error: string}>()
)