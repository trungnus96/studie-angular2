import { Pipe, PipeTransform } from '@angular/core';
import { Degree } from '../components/user-mark/degree';

@Pipe({
  name: 'groupDegreeBySchool',
  pure: false
})
export class GroupDegreeBySchoolPipe implements PipeTransform {

  transform(degrees: Degree[], school_id: String): any {
    return degrees.filter(degree => degree.school_id == school_id);
  }
}
