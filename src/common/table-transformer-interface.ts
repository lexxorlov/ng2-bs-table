import {TableFilterInterfacePipe} from "../filters/table-filter-interface.pipe";

export interface TableTransformerInterface {
    id: any;
    priority: number;
    params: {
        pipe: TableFilterInterfacePipe,
        args: any,
    }
}