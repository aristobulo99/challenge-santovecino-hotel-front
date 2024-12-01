import { createReducer, on } from "@ngrx/store";
import { RoomState } from "../../core/interfaces/room.state.interfaces";
import { getAllRoomRequest, getAllRoomSucces } from "../actions/room.action";


export const initialRoomStatus: RoomState = {
    rooms: [],
    loading: false,
    faild: ''
}

export const _roomReducer = createReducer(
    initialRoomStatus,
    on(getAllRoomRequest, (state) => ({
        ...state,
        loading: true
    })),
    on(getAllRoomSucces, (state, {rooms}) => ({
        ...state,
        rooms: rooms,
        loading: true
    })),
)