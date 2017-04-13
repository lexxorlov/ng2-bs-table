import {Router} from "@angular/router";
import {TableActionInterface} from "./table-action-interface";

/**
 * Render link. Route on link.
 */
export class TableViewAction implements TableActionInterface {
    name: string;
    glyphicon: string;
    link: [string, any[]];
    label: string;

    constructor(name: string, label: string, link: [string, any[]], glyphicon: string) {
        this.name = name;
        this.label = label;
        this.link = link;
        this.glyphicon = glyphicon;
    }

    toRoute(router: Router, data: any): void {
        let query: any[] = [];
        query.push(this.link[0]);
        for (let i in this.link[1]) {
            query.push(data[this.link[1][i]]);
        }
        router.navigate(query);
    }

    visible(data: any): boolean {
        return true;
    }
}