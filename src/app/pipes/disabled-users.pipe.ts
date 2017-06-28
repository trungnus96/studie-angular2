import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../components/admin-user-mgmt/user';

@Pipe({
  name: 'disabledUsers',
  pure: false
})
export class DisabledUsersPipe implements PipeTransform {

  transform(users: User[], username: string, search_query: string): any {
    return users.filter(user => user.isDisable && user.username != username && user.username.includes(search_query))
  }
}
