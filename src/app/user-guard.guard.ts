import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
  constructor(public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.log("yes");
    // return true;
      // let getEmail = JSON.parse();
      // console.log(getEmail);
      if (localStorage.getItem("OnlineUser")) {
        return true;
      } else {
        this.router.navigate(['/signin'])
      }
  }
  
}
