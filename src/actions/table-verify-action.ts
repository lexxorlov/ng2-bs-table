import {TableViewAction} from "./table-view-action";
import {Router} from "@angular/router";

/**
 * Render link. On route call confirm. If confirm is yes then go to route.
 */
export class TableVerifyAction extends TableViewAction {
    toRoute(router: Router, data: any): void {
        if (confirm('Are you sure')) {
            super.toRoute(router, data);
        }
    }
}