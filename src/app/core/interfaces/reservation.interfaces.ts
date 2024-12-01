import { Room } from "./room.interfaces";
import { User } from "./users.interfaces";

export interface DateReservation{
    startDate: Date;
    endDate: Date;
    state: boolean;
}

export interface CreateReservation extends DateReservation {
    userId: string;
    roomId: string;
}

export interface Reservation extends CreateReservation { 
    id: string;
}

export interface RoomReservation extends DateReservation {
    id: string;
    room: Room
}

export interface MyReservation {
    user: User;
    roomReservation: RoomReservation[]
}