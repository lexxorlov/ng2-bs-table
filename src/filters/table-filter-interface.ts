import {TableElementInterface} from "../common/table-element-interface";

export interface TableFilterInterface extends TableElementInterface {

    variable: string;

    /**
     * Template receive columnName and data
     */
    getTemplate(): string;
}