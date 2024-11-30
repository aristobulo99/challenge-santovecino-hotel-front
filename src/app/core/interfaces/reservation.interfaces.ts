import { Room } from "./room.interfaces";
import { User } from "./users.interfaces";

export interface DateReservation{
    startDate: Date;
    endDate: Date;
}

export interface CreateReservation extends DateReservation {
    userId: number;
    roomId: number;
}

export interface Reservation extends CreateReservation { 
    id: number;
}

export interface RoomReservation extends DateReservation {
    room: Room
}

export interface MyReservation {
    user: User;
    roomReservation: RoomReservation[]
}