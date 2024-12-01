import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";


export const selectReservationState = (state: AppState) => state.reservation;

export const selectorReservations = createSelector(
    selectReservationState,
    (state) => state.reservations
);

export const selectorLoading = createSelector(
    selectReservationState,
    (state) => state.loading
);

export const selectorFaild = createSelector(
    selectReservationState,
    (state) => state.falid
)