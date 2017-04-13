import {Component, Input, Output, EventEmitter} from "@angular/core";
import {TableViewAction} from "./table-view-action";
import {Router} from "@angular/router";
import {ActionClickEvent} from "../events/action-click-event";

@Component({
    moduleId: module.id,
    selector: 'table-view-actions',
    templateUrl: 'table-actions.component.html',
})
export class TableActionsComponent {
    @Input() actions: Array<TableViewAction>;
    @Input() data: any;

    @Output() actionClick: EventEmitter<any> = new EventEmitter();

    onActionClick(action: TableViewAction) {
        action.toRoute(this.router, this.data);
        this.actionClick.emit(new ActionClickEvent(action, this.data));
    }

    constructor(public router: Router) {
    }
}