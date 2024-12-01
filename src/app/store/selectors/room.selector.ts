import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";


export const selectRoomState = (state: AppState) => state.room;

export const selectorRoom = createSelector(
    selectRoomState,
    (state) => state.rooms
);

export const selectorRoomLoading = createSelector(
    selectRoomState,
    (state) => state.loading
);

export const selectorRoomFaild = createSelector(
    selectRoomState,
    (state) => state.faild
);