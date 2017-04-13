import {
    Input,
    Output,
    Component,
    EventEmitter
} from '@angular/core';
import {FilterEvent} from "../../events/filter-event";
import {TableInputFilterPipe} from "./table-input-filter.pipe";
import {TableFilterInterfaceComponent} from "../table-filter-interface.component";

@Component({
    moduleId: module.id,
    selector: 'table-input-filter',
    template: `<input type="text"  (change)="onChange($event)" class="form-control" placeholder=""/>`
})
export class TableInputFilterComponent implements TableFilterInterfaceComponent{
    @Input() collection: Array<{}>;
    @Input() columnName: string;

    @Output() filter: EventEmitter<any> = new EventEmitter;

    onChange(event: any) {
        // let s: (data: any[]) => any[];
        // let data = this.collection.getData()
        //     .filter(this.filterByString(this.columnName, event.target.value));
        // this.collection.setData(data);
        this.filter.emit(new FilterEvent(new TableInputFilterPipe(), this.columnName, event.target.value));
    }
}