import { faker } from "@faker-js/faker";
import { DateFormatPipe } from "../../shared/pipe/date-format/date-format.pipe";
import { RoomReservation } from "../interfaces/reservation.interfaces";
import { getRoomList } from "./room.mock";

export function getRoomReservation(iterations: number = 1): RoomReservation[]{
    const data: RoomReservation[] = [];
    for(let i = 0; i < iterations; i++){
        data.push(
            {
                id: faker.number.int()+'',
                startDate: faker.date.anytime(),
                endDate: faker.date.anytime(), 
                state: faker.datatype.boolean(),
                room: getRoomList()[0]
            }
        )
    }
    return data;
}