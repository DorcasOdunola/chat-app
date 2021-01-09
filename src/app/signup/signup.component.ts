import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviourService } from '../services/behaviour.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

 
  
  constructor(public formBuilder: FormBuilder, public behaviourService: BehaviourService, public router: Router, private snackBar: MatSnackBar) { }

  public userForm = this.formBuilder.group({
    userId: [],
    fullname: [''],
    phoneno: ['', [Validators.minLength(11), Validators.maxLength(15)]],
    email: [''],
    address: [''],
    username: ['',[Validators.minLength(7), Validators.maxLength(20)]],
    picture: [''],
    password: ['',[Validators.minLength(6), Validators.maxLength(12)]],
    conpassword: ['',[Validators.minLength(6), Validators.maxLength(12)]],
  })
  public userArray = [];
  public showResult;
  public image: any = "assets/user.png";
  public eachUserId:number = 1;
  ngOnInit(): void {
    
  }

  uploadImage(event){
    let file = event.target.files[0];
    let reader = new FileReader;
    reader.onload = () => {
      this.image = reader.result;
    }
    reader.readAsDataURL(file);
  }
  saveUser() {
    if (localStorage.getItem("Userlist") != null) {
      this.userArray = this.behaviourService.sendUserArray();   
    } else {
      this.userArray = [];  
    }

    if (localStorage.getItem("userId") != null) {
        this.eachUserId = JSON.parse(localStorage.getItem("userId"));  
    } else {
      this.eachUserId = 1; 
    }
    if (this.userForm.valid) {
      if (this.userForm.controls["password"].value == this.userForm.controls["conpassword"].value) {
       let findUser = this.userArray.find(user => 
        (user.fullname == this.userForm.controls["fullname"].value) && 
        (user.phoneno == this.userForm.controls["phoneno"].value) && 
        (user.username == this.userForm.controls["username"].value) && 
        (user.email == this.userForm.controls["email"].value) &&
        (user.address == this.userForm.controls["address"].value) &&
        (user.password == this.userForm.controls["password"].value) &&
        (user.conpassword == this.userForm.controls["conpassword"].value));
        console.log(findUser);
        if (findUser) {
          let snackBarRef = this.snackBar.open('Account Alreay Existed');
          this.userForm.reset();
          return;
        } else {
          let user = this.userForm.value;
          user.userId = this.eachUserId++;      
          user.picture = this.image;
          this.userArray.push(user);
          localStorage.setItem("userId", JSON.stringify(this.eachUserId));
          localStorage.setItem("Userlist", JSON.stringify(this.userArray)); 
          this.router.navigate(['/acctcreated']);
          this.userForm.reset();   
        }
      } else {
        alert("Password must be the same!!!");
      }      
    } else {
      alert("Invalid Input");
    }
  }

  clickUpload(){
    document.getElementById('pictureInp').click()
  }
}
