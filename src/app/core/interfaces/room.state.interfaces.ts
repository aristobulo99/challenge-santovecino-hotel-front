import { Room } from "./room.interfaces";

export interface RoomState {
    rooms: Room[];
    loading: boolean;
    faild: string;
}