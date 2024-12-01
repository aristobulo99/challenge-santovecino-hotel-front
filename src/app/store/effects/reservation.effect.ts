import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ReservationService } from "../../core/services/reservation/reservation.service";
import { RoomService } from "../../core/services/room/room.service";
import { faildReservation, getReservationByUserIdReques, getReservationByUserIdSuccesss } from "../actions/reservatio.action";
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
                (action) => this.reservationService.getReservationByUserIdTemp(action.userId).pipe(
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
    )

}