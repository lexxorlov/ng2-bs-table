import {TableElementInterface} from "../common/table-element-interface";

export interface TableColumnInterface extends TableElementInterface {

    /**
     * Render column cell
     * @param data
     */
    render(data: any): any;

    /**
     * Get column type
     */
    getType(): string;
}