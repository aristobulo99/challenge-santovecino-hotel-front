import { faker } from "@faker-js/faker";
import { DataSource } from "../interfaces/table.interfaces";
import { DateFormatPipe } from "../../shared/pipe/date-format/date-format.pipe";


export function getDataSource(iterations: number = 1): DataSource[]{
    const data: DataSource[] = [];
    const dataForm: DateFormatPipe = new DateFormatPipe()
    for(let i = 0; i < iterations; i++){
        let state: boolean = faker.datatype.boolean();
        data.push(
            {
                'id': faker.number.int({min: 1, max:100}),
                'state': state,
                'Habitación': `Habitacion N° ${faker.number.int({min: 1, max:100})}`,
                'Fecha': `${dataForm.transform(faker.date.anytime(), "DD/MM/YYYY") } - ${dataForm.transform(faker.date.anytime(), "DD/MM/YYYY") }`,
                'Estado': state ? 'Confirmado' : 'Cancelado',
                'actions': state ?  [{title:'Cancelar', type: 'outline', size:"small"}, {title:'Modificar', type: 'flat', size:"small"}] : []

            }
        );
    }
    return data;
}