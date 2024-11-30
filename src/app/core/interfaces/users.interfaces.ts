

export interface CreateUser{
    document: number;
    name: string;
    email: string;
    phone: string;
}

export interface User extends CreateUser{
    id: number;
}