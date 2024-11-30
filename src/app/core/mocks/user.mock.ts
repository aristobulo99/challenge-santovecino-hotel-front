import { faker } from "@faker-js/faker";
import { User } from "../interfaces/users.interfaces";


export function getUsers(iteration: number = 1): User[] {
    const users: User[] = [];
    for(let i = 0; i < iteration; i++){
        users.push(
            {
                id: faker.number.int({min: 1, max:100}),
                name: faker.person.fullName(),
                document: faker.number.int({min: 999999, max:100000000}),
                email: faker.internet.email(),
                phone: faker.phone.number()
            }
        )
    }
    return users;
}