import {Component, Input, Output, EventEmitter, OnInit, OnChanges} from "@angular/core";
import {JsonPipe} from "@angular/common";
import {OrderByPipe} from "./pipes/order-by.pipe";
import {FormatPipe} from "./pipes/format.pipe";
import {TableViewSorting} from "./table-view-sorting";
import {TableSharedModule} from "./table-shared.module";
import {TableFilterInterface} from "./filters/table-filter-interface";
import {TransformByPipe} from "./pipes/transform-by.pipe";
import {TableTransformerInterface} from "./common/table-transformer-interface";
import {TableColumnInterface} from "./columns/table-column-interface";
import {TableActionInterface} from "./actions/table-action-interface";
import {TableViewPagination} from "./table-view-pagination";

@Component({
    moduleId: module.id,
    selector: 'table-view',
    templateUrl: 'table-view.component.html',
    providers: [OrderByPipe, JsonPipe, FormatPipe, TransformByPipe]
})
export class TableViewComponent implements OnInit, OnChanges {
    //Inputs
    @Input() collection: Array<{}>;
    @Input() columns: Array<TableColumnInterface>;
    @Input() filters: Array<TableFilterInterface> = [];
    @Input() actions: Array<TableActionInterface> = [];
    @Input() imports: Array<any> = [];
    @Input() autoPipe: boolean = true;
    @Input() transformers: Array<TableTransformerInterface> = [];
    @Input() sorting: TableViewSorting; // @todo Implement interface
    @Input() pagination: TableViewPagination = new TableViewPagination;  // @todo Implement interface

    //Outputs
    @Output() order: EventEmitter<any> = new EventEmitter();
    @Output() filter: EventEmitter<any> = new EventEmitter();
    @Output() cellChange: EventEmitter<any> = new EventEmitter();
    @Output() pageChange: EventEmitter<any> = new EventEmitter();
    @Output() actionClick: EventEmitter<any> = new EventEmitter();

    private totalItems: number;

    /**
     * ng init
     */
    ngOnInit() {
        this.imports = Object.assign(this.imports, [TableSharedModule]);

        this.sorting.onEventSort().subscribe((event) => {
            this.onOrder(event);
        });

        this.pagination.onEventPage().subscribe((event) => {
            this.onPageChange(event);
        });

        this.setTransformer(this.pagination.doPaging(1, this.getTotalItems()));

        this.setTransformer(this.sorting.orderBy());
    }

    /**
     * On changes input
     * @param changes
     */
    ngOnChanges(changes: any) {
        this.setTransformer(this.pagination.doPaging(1, this.getTotalItems()));
    }

    // /**
    //  * Order by column
    //  * @return {string}
    //  */
    // orderBy() {
    //     return this.sorting.orderBy();
    // }

    /**
     * Transform by all transformers
     * @return {{pipe: TableFilterInterfacePipe, args: any}[]}
     */
    transformBy(): any[] {
        return this.transformers.map((data) => {
            return data.params;
        });
    }

    /**
     * Set collection
     * @param collection
     * @param totalItems
     */
    setCollection(collection: Array<any>, totalItems: number): void {
        this.collection = collection;
        this.setTotalItems(totalItems);
    }

    /**
     * Set total items. You can set total items. If you set total then
     * getTotalItems will always return <total>.
     * @param totalItems
     */
    setTotalItems(totalItems: number): void {
        this.totalItems = totalItems;
    }

    /**
     * Get total items.
     * @return {number}
     */
    getTotalItems(): number {
        let value = this.totalItems || 0;
        if (this.collection !== null || this.totalItems === null) {
            let filters = this.transformers.filter((transformer) => {
                return transformer.priority == 0;
            });
            let collection: Array<{}> = (new TransformByPipe()).transform(this.collection, filters.map((transformer) => {
                return transformer.params;
            }));
            value = collection.length
        }
        return value;
    }

    /**
     * Set transformer to transformers list. If transformer exists then it will be rewritten.
     *
     * @param transformer
     */
    setTransformer(transformer?: TableTransformerInterface): void {
        if (null === transformer || this.autoPipe === false) {
            return;
        }
        let transformers = this.transformers.filter((e: any) => {
            return e.id != transformer.id;
        });
        transformers.push(transformer);

        transformers = transformers.sort((a, b) => {
            return a.priority - b.priority;
        });

        this.transformers = transformers;
    }

    /**
     * Get transformer by id
     * @param id
     * @return {undefined|TableTransformerInterface}
     */
    getTransformer(id: number): TableTransformerInterface {
        return this.transformers.find((transformer) => {
            return transformer.id == id;
        });
    }

    /**
     * Event page Change
     * @param event
     */
    onPageChange(event: any) {
        this.setTransformer(this.pagination.doPaging(event.currentPage, this.getTotalItems()));

        this.pageChange.emit(event);
    }

    /**
     * Event cell change
     * @param event
     */
    onCellChange(event: any) {
        this.cellChange.emit(event);
    }

    /**
     * Event collection order
     * @param event
     */
    onOrder(event: any): void {
        this.setTransformer(this.sorting.orderBy());

        this.order.emit(event);
    }

    /**
     * Event collection filter
     * @param event
     */
    onFilter(event: any): void {
        this.setTransformer({
            id: event.columnName,
            priority: 0,
            params: {
                pipe: event.pipe,
                args: {
                    columnName: event.columnName,
                    filter: event.filter
                }
            }
        });

        this.setTransformer(this.pagination.doPaging(1, this.getTotalItems()));

        this.filter.emit(event);
    }

    /**
     * Event action click
     * @param event
     */
    onActionClick(event: any): void {
        this.actionClick.emit(event);
    }
}