

export interface CreateUser{
    document: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface User extends CreateUser{
    id: string;
}