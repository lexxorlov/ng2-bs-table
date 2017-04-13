import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OrderByPipe} from "./pipes/order-by.pipe";
import {FormatPipe} from "./pipes/format.pipe";
import {TableViewComponent} from "./table-view.component";
import {RouterModule} from "@angular/router";
import {TableActionsComponent} from "./actions/table-actions.component";
import {TableHtmlOutlet, TableFilterOutlet} from "./table-html-outlet";
import {TransformByPipe} from "./pipes/transform-by.pipe";
import {PaginationModule} from "ng2-bs-pagination"

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PaginationModule
    ],
    declarations: [
        TableViewComponent,
        TableActionsComponent,
        TableHtmlOutlet,
        TableFilterOutlet,
        OrderByPipe,
        FormatPipe,
        TransformByPipe
    ],
    exports: [
        TableViewComponent,
        TableActionsComponent,
        TableHtmlOutlet,
        TableFilterOutlet,
        OrderByPipe,
        FormatPipe
    ],
    providers: [
    ]
})
export class TableViewModule {
}