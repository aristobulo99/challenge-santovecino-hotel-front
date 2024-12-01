import { createReducer, on } from "@ngrx/store";
import { ReservationState } from "../../core/interfaces/reservation.state.interfaces";
import { faildReservation, getReservationByUserIdReques, getReservationByUserIdSuccesss } from "../actions/reservatio.action";

export const initialReservationStatus: ReservationState = {
    roomReservation: [],
    reservations: [],
    loading: false,
    falid: ''
}

export const _reservationReducer = createReducer(
    initialReservationStatus,
    on(getReservationByUserIdReques, (state) => ({
        ...state,
        loading: true
    })),
    on(getReservationByUserIdSuccesss, (state, {reservations}) => ({
        ...state,
        reservations: reservations,
        loading: false
    })),
    on(faildReservation, (state, {error}) => ({
        ...state,
        falid: error,
        loading: false
    })),
)