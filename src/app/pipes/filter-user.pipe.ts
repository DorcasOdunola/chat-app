import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(userList: any[], searchUser: any): unknown {
    searchUser = searchUser.toLowerCase();
    if (!searchUser) return userList;
    let filteredUser = userList.filter(user =>
      user.fullname.toLowerCase().includes(searchUser) ||
      user.phoneno.includes(searchUser) ||
      user.email.toLowerCase().includes(searchUser) ||
      user.address.toLowerCase().includes(searchUser) ||
      user.username.toLowerCase().includes(searchUser))
    return filteredUser;
  }
}
