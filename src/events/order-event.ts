export class OrderEvent {
    columnName: string;
    descending: boolean;

    constructor(columnName: string, descending: boolean) {
        this.columnName = columnName;
        this.descending = descending;
    }
}