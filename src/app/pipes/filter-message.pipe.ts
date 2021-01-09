import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMessage'
})
export class FilterMessagePipe implements PipeTransform {

  transform(msgList: any[], searchMsg: any): unknown {
    searchMsg.toLowerCase()
    if (!searchMsg) return msgList;
    let filteredMsg = msgList.filter(msg => msg.message.toLowerCase().includes(searchMsg));
    return filteredMsg;
  }

}
