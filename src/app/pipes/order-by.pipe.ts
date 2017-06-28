import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  pure:false
})
export class OrderByPipe implements PipeTransform {

  transform(array: Array<string>, args: string): Array<string> {
    array.sort((a: any, b: any) => {
      if (a.year_level < b.year_level) {
        return -1;
      }
      else {
        if (a.year_level > b.year_level) {
          return 1;
        }
        else {
          if (a.semester < b.semester){
            return -1;
          }
          else{
            if(a.semester > b.semester){
              return 1;
            }
            else{
              return 0;
            }
          }
        }
      }
    });
    return array;
  }
}
