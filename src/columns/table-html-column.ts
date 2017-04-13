import {TableColumnInterface} from "./table-column-interface";

export abstract class TableHtmlColumn implements TableColumnInterface {
    public display: string;
    public variable: string;
    public sortable: boolean = true;

    constructor(display: string, variable: string, sortable?: boolean) {
        this.display = display;
        this.variable = variable;
        this.sortable = sortable != null ? sortable : false;
    }

    getColumnName(): string {
        return this.variable;
    }

    render(data: any): any {
        return this.getTemplate();
    }

    getType(): string {
        return 'templateHtml';
    }

    /**
     * Template receive columnName, data. Also you can set event "onCellChange"
     */
    abstract getTemplate(): string;
}