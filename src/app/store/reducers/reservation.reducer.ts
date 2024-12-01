import { createReducer, on } from "@ngrx/store";
import { ReservationState } from "../../core/interfaces/reservation.state.interfaces";
import { faildReservation, getReservationByUserIdReques, getReservationByUserIdSuccesss, patchReservationDateRequest, patchReservationDateSuccess } from "../actions/reservatio.action";

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
    on(patchReservationDateRequest, (state) => ({
        ...state,
        loading: true
    })),
    on(patchReservationDateSuccess, (state, {reservation}) => ({
        ...state,
        reservations: state.reservations.map(rv => reservation.id === rv.id ? reservation : rv),
        loading: false
    })),
    on(faildReservation, (state, {error}) => ({
        ...state,
        falid: error,
        loading: false
    })),
)