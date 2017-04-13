import {TableFilterInterfacePipe} from "../table-filter-interface.pipe";

export class TableInputFilterPipe implements TableFilterInterfacePipe {
    transform(input, args: any): any {
        let filter = args.filter.toString().toLowerCase();
        return input.filter((row) => {
            return !filter || row[args.columnName].toString().toLowerCase().indexOf(filter) !== -1;
        });
    }
}