import {TableFilterInterfacePipe} from "../filters/table-filter-interface.pipe";

export class FilterEvent {
    pipe: TableFilterInterfacePipe;
    columnName: string;
    filter: any;

    constructor(pipe: TableFilterInterfacePipe, columnName: string, filter: any) {
        this.pipe = pipe;
        this.columnName = columnName;
        this.filter = filter;
    }
}