import { ActionReducerMap } from "@ngrx/store";
import { ReservationState } from "../core/interfaces/reservation.state.interfaces";
import { _reservationReducer } from "./reducers/reservation.reducer";
import { RoomState } from "../core/interfaces/room.state.interfaces";
import { _roomReducer } from "./reducers/room.reducer";


export interface AppState {
    reservation: ReservationState
    room: RoomState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    reservation: _reservationReducer,
    room: _roomReducer
}   