import { Room } from "../interfaces/room.interfaces";
import { faker } from '@faker-js/faker';

export function getRoomList(iterations: number = 1): Room[]{
    const room: Room[] = [];
    for(let i = 0; i < iterations; i++){
        room.push(
            {
                id: faker.number.int({min: 1, max: 100})+'',
                name: 'Habitacion N° 1',
                ability: faker.number.int({min: 1, max: 5}),
                description: `Este espacioso alojamiento cuenta con una cama king-size, aire acondicionado para mantenerte fresco durante todo el día, y un balcón privado con vistas a los hermosos paisajes tropicales o al mar Caribe. La habitación incluye un baño privado, ducha de efecto lluvia . También tendrás acceso a TV de pantalla plana con cable, Wi-Fi de alta velocidad, minibar y servicio a la habitación 24/7.\n\n¡Una experiencia perfecta para desconectarte y disfrutar de Cancún en toda su esencia!`,
                state: faker.datatype.boolean(),
                image: 'https://i.pinimg.com/736x/ee/50/96/ee509670391a3fbb01cccea28d619790.jpg'
            }
        )
    }
    return room;
}