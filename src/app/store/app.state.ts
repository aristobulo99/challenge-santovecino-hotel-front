import { ActionReducerMap } from "@ngrx/store";
import { ReservationState } from "../core/interfaces/reservation.state.interfaces";
import { _reservationReducer } from "./reducers/reservation.reducer";


export interface AppState {
    reservation: ReservationState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    reservation: _reservationReducer
}   