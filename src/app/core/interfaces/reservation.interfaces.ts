import { Room } from "./room.interfaces";
import { User } from "./users.interfaces";

export interface DateReservation{
    startDate: Date;
    endDate: Date;
}

export interface CreateReservation extends DateReservation {
    userId: string;
    roomId: string;
    state: boolean;
}

export interface Reservation extends CreateReservation { 
    id: string;
}

export interface RoomReservation extends DateReservation {
    id: string;
    room: Room;
    state: boolean;
}

export interface MyReservation {
    user: User;
    roomReservation: RoomReservation[]
}