import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BehaviourService {

  constructor() { }

  sendUserArray() {
    return JSON.parse(localStorage.getItem("Userlist"));
  }

  public userIdDataSrc = new BehaviorSubject(Number);
  public userIdDataSrcLogin = new BehaviorSubject(Number);
  public onPrfDataSrc = new BehaviorSubject({});

  updateDataSrc(value) {
    this.userIdDataSrc.next(value);
  }
  
  updateDataSrcTwo(val) {
    this.userIdDataSrcLogin.next(val)
  }

  updateDataSrcThree(val) {
    this.onPrfDataSrc.next(val);
  }
}
