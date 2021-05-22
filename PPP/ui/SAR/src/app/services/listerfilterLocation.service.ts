import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'listFilterLocation'})
export class ListFilterPipeLocation implements PipeTransform {

    transform(list: any[], filterText: string): any {
        return list ? list.filter(item => item.location.search(new RegExp(filterText, 'i')) > -1) : [];
    }
}