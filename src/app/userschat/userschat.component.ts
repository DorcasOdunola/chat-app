import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DelBottomsheetComponent } from '../del-bottomsheet/del-bottomsheet.component';
import { BehaviourService } from '../services/behaviour.service';

@Component({
  selector: 'app-userschat',
  templateUrl: './userschat.component.html',
  styleUrls: ['./userschat.component.css']
})
export class UserschatComponent implements OnInit {

  constructor(public behaviourService: BehaviourService, private bottomSheet: MatBottomSheet) { }

  public chatUserId;
  public onlineUserId;
  public message = "";
  public messageArray = [];
  public date = new Date();
  public getChatArray = [];
  public verify = false;
  public hiFriends = "";
  public searchMsg = "";
  public msgId:number = 1;
  public p = "";

  ngOnInit(): void {
    this.chatUserId = undefined;
    if (this.getChatArray.length == 0) {
      // this.verify = false;
      this.hiFriends = "Say hi to your Friends";
    }
    this.messageArray = JSON.parse(localStorage.getItem("Chat"));
      this.behaviourService.userIdDataSrcLogin.subscribe(data => {
        this.onlineUserId = data;
      })
    this.behaviourService.userIdDataSrc.subscribe(data => {
      this.chatUserId = data;
      if (this.chatUserId >= 0) {
       this.verify = true;
      } else {
        this.verify = false;
      }
     
      if (this.messageArray != null) { 
        if (this.chatUserId == 5) {
          this.getChatArray = this.messageArray.filter(msg => msg.receiverId == 5)
        } else {          
          this.getChatArray = this.messageArray.filter(msg =>(msg.senderId == this.onlineUserId && msg.receiverId == this.chatUserId) || (this.onlineUserId == msg.receiverId && this.chatUserId == msg.senderId));
        }      
        this.getChatArray.map(chatFloat => {
          if (chatFloat.senderId == this.onlineUserId) {
              chatFloat.check = true;
          } else {
            chatFloat.check = false;
          }
        })
      }
    })
  }

  saveMessage() {
    console.log(this.chatUserId);
    if (localStorage.getItem("Chat") != null) {
      this.messageArray = JSON.parse(localStorage.getItem("Chat"));
      console.log(this.messageArray);
    } else {
      this.messageArray = [];
      console.log(this.messageArray);
    }

    if (localStorage.getItem("msgId") != null) {
      this.msgId = JSON.parse(localStorage.getItem("msgId"));
    } else {
      this.msgId = 1;
    }
    
    let chatHrs = this.date.getHours();
    let chatMin = this.date.getMinutes();
    let time = `${chatHrs}:${chatMin}`;
    let id = this.msgId++;
    let messageObj = {msgId: id, message: this.message, senderId: this.onlineUserId, receiverId: this.chatUserId, time: time, seen: false, deleted: false};
    this.messageArray.push(messageObj);
    this.getChatArray.push(messageObj);
    this.getChatArray.map(chatFloat => {
      if (chatFloat.senderId == this.onlineUserId) {
        chatFloat.check = true;
      } else {
        chatFloat.check = false;
      }
    })
    localStorage.setItem("Chat", JSON.stringify(this.messageArray));
    localStorage.setItem("msgId", JSON.stringify(this.msgId));
    this.message = "";
  }

  showSearchInp() {
    document.getElementById("searchInp").style.display = "none";
  }

  delMessage(msgId, msg): void {
    if (msg == "This message has been deleted") {
      return;
    }
    const bottomSheetRef = this.bottomSheet.open(DelBottomsheetComponent);
    bottomSheetRef.afterDismissed().subscribe((data) => {
      if (data == false) {
        console.log(data);
        return;
      } else if (data == true) {
        console.log(data);
        let findFirst = this.getChatArray.findIndex(find => find.msgId == msgId);
        let findSec = this.messageArray.findIndex(find => find.msgId == msgId);
        console.log(findFirst);
        console.log(findSec);
        console.log("done");
        if (findFirst >= 0 || findSec >= 0) {
          this.getChatArray[findFirst].deleted = true;
          this.messageArray[findSec].deleted = true;
          localStorage.setItem("Chat", JSON.stringify(this.messageArray));
        } 
      }
    })
  }
}
