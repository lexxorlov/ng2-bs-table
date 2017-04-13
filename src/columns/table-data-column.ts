import {TableColumnInterface} from "./table-column-interface";

export class TableDataColumn implements TableColumnInterface {
    public display: string;
    public variable: string;
    public filter: string;
    public sortable: boolean = true;

    constructor(display: string, variable: string, filter: string, sortable?: boolean) {
        this.display = display;
        this.variable = variable;
        this.filter = filter;
        this.sortable = sortable != null ? sortable : true;
    }

    getColumnName(): string {
        return this.variable;
    }

    getType(): string {
        return 'innerHtml';
    }

    render(data: any): any {
        return data[this.getColumnName()];
    }
}