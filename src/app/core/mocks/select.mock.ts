import { faker } from "@faker-js/faker";
import { SelectionOption } from "../../shared/components/atom/select/select.component";

export function getSelectionOption(iteration: number = 1): SelectionOption[]{
    const select: SelectionOption[] = [];
    for(let i = 0; i < iteration; i++){
        select.push(
            {
                valueId: faker.number.int(),
                option: faker.animal.dog()
            }
        );
    }
    return select;
}