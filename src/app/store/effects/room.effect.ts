import { Injectable } from "@angular/core";
import { Wrapper } from "./reservation.effect";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RoomService } from "../../core/services/room/room.service";
import { getAllRoomRequest, getAllRoomSucces } from "../actions/room.action";
import { catchError, exhaustMap, map, of } from "rxjs";
import { faildReservation } from "../actions/reservatio.action";


@Injectable() export class RoomEffects extends Wrapper {

    constructor(
        actions$: Actions,
        private roomService: RoomService
    ){
        super(actions$);
    }

    getAllRoom$ = createEffect(
        () => this.actions$.pipe(
            ofType(getAllRoomRequest),
            exhaustMap(
                () => this.roomService.getRoomsObs()
                    .pipe(
                        map((rooms) => getAllRoomSucces({rooms: rooms})),
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