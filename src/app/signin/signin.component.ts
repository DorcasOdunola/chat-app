import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import { BehaviourService } from '../services/behaviour.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public router: Router, public behaviourService: BehaviourService) { }

  public userArray = [];
  public usernameEmail = "";
  public password = "";
  public showincorrect = "";
  public saveOnlineUser = "";
  public userId;

  ngOnInit(): void {
    this.userArray = this.behaviourService.sendUserArray();
    console.log(this.userArray);
  }

  loginUser() {
    
    
    this.userArray.map(user=> {
      if ((user.username == this.usernameEmail || user.email == this.usernameEmail) && (user.password == this.password)) {
        this.saveOnlineUser = this.usernameEmail;
        this.router.navigate(['/chat']);
        localStorage.setItem("OnlineUser", JSON.stringify(this.saveOnlineUser));
        this.showincorrect = "";
        this.userId = user.userId;
        console.log(this.userId);
      } else {
        this.showincorrect = "Incorrect Password or Username!"
      }
    })
  }

}
