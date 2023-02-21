export enum Types {
    BF = 'BF',
    LN = 'LN',
    DR = 'DR'
}

export type CalendarInput = {
    from: string,
    to: string,
    types: Types[]
}

export enum TypesName {
    BF = 'Breakfast',
    LN = 'Lunch',
    DR = 'Dinner'
}