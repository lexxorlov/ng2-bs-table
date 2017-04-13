import {TableActionInterface} from "../actions/table-action-interface";

export class ActionClickEvent {
    action: TableActionInterface;
    data: any[];

    constructor(action, data) {
        this.action = action;
        this.data = data;
    }
}