import {TableDataColumn} from "./columns/table-data-column";
import {EventEmitter} from "@angular/core";
import {OrderEvent} from "./events/order-event";
import {TableTransformerInterface} from "./common/table-transformer-interface";
import {OrderByPipe} from "./pipes/order-by.pipe";

export class TableViewSorting {

    private sort: EventEmitter<any> = new EventEmitter();

    constructor(public column: string, public descending: boolean) {
    }

    onEventSort(): EventEmitter<any> {
        return this.sort;
    }

    does(column: TableDataColumn) {
        if (!column.sortable) return;

        if (this.column == column.variable) {
            this.descending = !this.descending;
        } else {
            this.column = column.variable;
            this.descending = false;
        }

        this.sort.emit(new OrderEvent(this.column, this.descending))
    }

    orderBy(): TableTransformerInterface | null {
        return {
            id: 'sorting',
            priority: 5,
            params: {
                pipe: new OrderByPipe(),
                args: this.descending ? '-' + this.column : this.column
            }
        };
    }

    getClass(column: TableDataColumn) {
        if (!column.sortable) return 'ui-not-sortable';

        return column.variable == this.column ? 'sort-' + (this.descending ? 'desc' : 'asc') : '';
    }
}