export interface CreateRoom{
    name: string, 
    description: string;
    image: string;
    ability: number;
    state: boolean
}

export interface Room extends CreateRoom {
    id: string;
}