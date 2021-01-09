import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviourService } from '../services/behaviour.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {

 @Output() addUserEvent = new EventEmitter<any>()

  constructor(public behaviourService: BehaviourService) { }

  public userArray = [];
  public getOnlineUser = "";
  public finalUserArray = [];
  public userFilter = "";
  public getfornow;
  public messageArray = [];
  public obj;

  ngOnInit(): void {
    this.userArray = this.behaviourService.sendUserArray();
    this.messageArray = JSON.parse(localStorage.getItem("Chat"));
    this.getOnlineUser = JSON.parse(localStorage.getItem("OnlineUser"));
    for (let i = 0; i < this.userArray.length; i++) {
      if(this.userArray[i].userId == 5) {
        this.getfornow = this.finalUserArray[0];
        this.finalUserArray[0] = this.userArray[i];
      } else {
        if ((this.userArray[i].username == this.getOnlineUser) || (this.userArray[i].email == this.getOnlineUser)) {
          continue      
        } else {
          this.finalUserArray.push(this.userArray[i]);
        }
      }
    }
    this.finalUserArray.push(this.getfornow);
    console.log(this.finalUserArray);
   let getUser = this.userArray.find(user => (user.email == this.getOnlineUser) || (user.username == this.getOnlineUser));

   let myMessages = this.messageArray.filter(m => m.senderId == getUser.userId || m.receiverId == getUser.userId);

   this.finalUserArray.map(contact => {
     let ourMessage = myMessages.filter(m => m.senderId == contact.userId || m.receiverId == contact.userId);
     let recentMessage = ourMessage[ourMessage.length - 1];
     console.log(recentMessage);
     if (recentMessage) {
       if (recentMessage.deleted == true) {
         contact.message = "This message has been deleted";
       } else {
         contact.message = recentMessage.message; 
       }
     } else {
       contact.message = "No recent Message"
     }
   })
  
    
  }
    

  sendUserId(userId) {
    this.addUserEvent.emit(userId);
    this.behaviourService.updateDataSrc(userId);
    let findUser =  this.userArray.find(user => (user.username == this.getOnlineUser || user.email == this.getOnlineUser));
    console.log(findUser);
     this.messageArray.map(msg => {
       if (msg.receiverId == findUser.userId) {
         console.log("seen");
           msg.seen = true
       }
     })
     localStorage.setItem("Chat", JSON.stringify(this.messageArray));
  }

  sendUserIdChat(userId) {
  }


  changeSeen() {
   
  }
  // deleteNow(userId) {
  //  let findIndex = this.userArray.findIndex(user => user.userId == userId);
  //  console.log(findIndex);
  //   this.userArray.splice(findIndex, 1);
  //   localStorage.setItem("Userlist", JSON.stringify(this.userArray));
  //   console.log(this.userArray);
  // }

}
