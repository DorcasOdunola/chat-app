import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviourService } from '../services/behaviour.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(public behaviourService: BehaviourService, public router: Router) { }

  public userArray = [];
  public getOnlineUser;
  public user;
  public chatUser;
  public userId;
  public onUserProfile;
  public chtUserProfile;
  ngOnInit(): void {
    this.getOnlineUser = JSON.parse(localStorage.getItem("OnlineUser"));
    this.userArray = this.behaviourService.sendUserArray();
    this.user = this.userArray.find(user => (user.email == this.getOnlineUser) || (user.username == this.getOnlineUser));
    this.userId = this.user.userId;
    this.behaviourService.updateDataSrcTwo(this.userId);
  }

  getUserId(userId) {
    this.chatUser = this.userArray.find((chatuser, i) => chatuser.userId == userId);
  }

  onlineUserProfile(user) {
    console.log(user);
    this.onUserProfile = user;
  }

  chatUserProfile(user) {
    this.chtUserProfile = user;
  }

  signOut() {
    localStorage.removeItem("OnlineUser");
    this.router.navigate(['/home'])
  }
}
