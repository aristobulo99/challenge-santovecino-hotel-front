import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ReservationService } from "../../core/services/reservation/reservation.service";
import { RoomService } from "../../core/services/room/room.service";
import { faildReservation, getReservationByUserIdReques, getReservationByUserIdSuccesss, patchReservationDateRequest, patchReservationDateSuccess, patchReservationStateRequest, patchReservationStateSuccess } from "../actions/reservatio.action";
import { catchError, exhaustMap, map, of } from "rxjs";
import { Room } from "../../core/interfaces/room.interfaces";
import { RoomReservation } from "../../core/interfaces/reservation.interfaces";

export abstract class Wrapper {
    constructor(protected readonly actions$: Actions) {}
}

@Injectable() export class ReservationEffects extends Wrapper {

    constructor(
        actions$: Actions,
        private reservationService: ReservationService
    ){
        super(actions$);
        console.log('ReservationEffect initialized');
    }

    getReservationByUserId$ = createEffect(
        () => this.actions$.pipe(
            ofType(getReservationByUserIdReques),
            exhaustMap(
                (action) => this.reservationService.getReservationByUserId(action.userId).pipe(
                    map(
                        (reservation) => getReservationByUserIdSuccesss({reservations: reservation})
                    ),
                    catchError(
                        (error) => {
                            let errorMessage: string = 'Se produjo un error inesperado.';
                            return of(faildReservation({ error: errorMessage }));
                        }
                    )
                )
            )
        )
    );

    patchReservationDates$ = createEffect(
        () => this.actions$.pipe(
            ofType(patchReservationDateRequest),
            exhaustMap(
                (action) => this.reservationService.patchReservationDate(action.reservationId, action.dates)
                    .pipe(
                        map(reservation => patchReservationDateSuccess({reservation: reservation})),
                        catchError(
                            (error) => {
                                let errorMessage: string = 'Se produjo un error inesperado.';
                                return of(faildReservation({ error: errorMessage }));
                            }
                        )
                    )
            )
        )
    );

    patchReservationState$ = createEffect(
        () => this.actions$.pipe(
            ofType(patchReservationStateRequest),
            exhaustMap(
                (action) => this.reservationService.patchReservationState(action.reservationId, action.state)
                    .pipe(
                        map(reservation => patchReservationStateSuccess({reservation: reservation})),
                        catchError(
                            (error) => {
                                let errorMessage: string = 'Se produjo un error inesperado.';
                                return of(faildReservation({ error: errorMessage }));
                            }
                        )
                    )
            )
        )
    );

}