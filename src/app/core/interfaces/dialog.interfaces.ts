import { TemplateRef } from "@angular/core"

export interface DialogData {
    title: string,
    width: string,
    text?: string,
    buttonsEnabled: boolean;
    templete?: TemplateRef<any>,
    nameAcceptButton?: string
    nameCancelButton?: string
    flexDirectionButton?: 'col' | 'row' | 'col-reverse' | 'row-reverse'
}