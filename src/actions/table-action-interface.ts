import {Router} from "@angular/router";

export interface TableActionInterface {
    name: string;
    glyphicon: string;
    link: [string, any[]];
    label: string;

    toRoute(router: Router, data: any): void;

    visible(data: any): boolean
}