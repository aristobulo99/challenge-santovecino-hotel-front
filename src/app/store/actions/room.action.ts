import { createAction, props } from "@ngrx/store";
import { Room } from "../../core/interfaces/room.interfaces";

export const getAllRoomRequest = createAction(
    "[Room] get all room request"
);

export const getAllRoomSucces = createAction(
    "[Room] get all room success",
    props<{rooms: Room[]}>()
);

export const faildRoom = createAction(
    "[Room] get all room success",
    props<{error: string}>()
);