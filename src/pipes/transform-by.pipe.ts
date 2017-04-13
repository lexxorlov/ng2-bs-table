import {Pipe, PipeTransform} from '@angular/core';
import {TableFilterInterfacePipe} from "../filters/table-filter-interface.pipe";

@Pipe({
    name: 'transformBy'
})
export class TransformByPipe implements PipeTransform {

    transform(input: any, args: Array<{pipe: TableFilterInterfacePipe, args: any}>): any {
        let data = input;

        for (let i = 0; i < args.length; i++) {

            data = args[i].pipe.transform(data, args[i].args);
        }

        return data;
    }
}