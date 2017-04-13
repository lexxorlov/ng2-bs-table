import {TableViewAction} from "./table-view-action";
import {Router} from "@angular/router";

/**
 * Render link. On route emit event.
 */
export class TableEmptyAction extends TableViewAction {
    toRoute(router: Router, data: any): void {
        return;
    }
}