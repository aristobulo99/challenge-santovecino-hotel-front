import { createAction, props } from "@ngrx/store";
import { DateReservation, Reservation, RoomReservation } from "../../core/interfaces/reservation.interfaces";


export const getReservationByUserIdReques = createAction(
    "[Reservation] get Reservation By UserId Request",
    props<{userId: string}>()
);

export const getReservationByUserIdSuccesss = createAction(
    "[Reservation] get Reservation By UserId Success",
    props<{reservations: Reservation[]}>()
);

export const patchReservationDateRequest = createAction(
    "[Reservation] patch Reservation Date Request",
    props<{reservationId: string, dates: DateReservation}>()
);

export const patchReservationDateSuccess = createAction(
    "[Reservation] patch Reservation Date Success",
    props<{reservation: Reservation}>()
);

export const patchReservationStateRequest = createAction(
    "[Reservation] patch Reservation State Request",
    props<{reservationId: string, state: boolean}>()
);

export const patchReservationStateSuccess = createAction(
    "[Reservation] patch Reservation State Success",
    props<{reservation: Reservation}>()
);

export const faildReservation = createAction(
    "[Reservation] faild Reservation",
    props<{error: string}>()
)