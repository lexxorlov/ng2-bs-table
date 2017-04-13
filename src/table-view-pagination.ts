import {TableDataColumn} from "./columns/table-data-column";
import {EventEmitter} from "@angular/core";
import {OrderEvent} from "./events/order-event";
// import {PaginationPipe} from "../pagination/pagination.pipe";
import {PaginationPipe} from "ng2-bs-pagination"
import {TableTransformerInterface} from "./common/table-transformer-interface";

export class TableViewPagination {

    private pageChange: EventEmitter<any> = new EventEmitter()

    pageSize: number = 10;

    totalItems: number;

    currentPage: number;

    doPaging(page: number, total: number): TableTransformerInterface | null {
        this.currentPage = page;
        this.totalItems = total;
        return {
            id: 'pagination',
            priority: 10,
            params: {
                pipe: new PaginationPipe(),
                args: {
                    pageSize: this.pageSize,
                    currentPage: this.currentPage,
                    totalItems: this.totalItems
                }
            }
        };
    }

    onPageChange(event) {
        this.pageChange.emit(event)
    }

    onEventPage(): EventEmitter<any> {
        return this.pageChange;
    }
}