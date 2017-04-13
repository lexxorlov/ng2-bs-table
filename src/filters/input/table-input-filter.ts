import {TableFilterInterface} from "../table-filter-interface";

export class TableInputFilter implements TableFilterInterface {
    variable: string;

    constructor(variable: string) {
        this.variable = variable;
    }

    getColumnName(): string {
        return this.variable;
    }

    getTemplate(): string {
        return '<table-input-filter [collection]="collection" [columnName]="columnName" (filter)="onFilter($event)"><table-input-filter>';
    }
}