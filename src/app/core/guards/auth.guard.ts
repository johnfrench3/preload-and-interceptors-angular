import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { UserProfileService } from '../user-profile.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  deniedMessage = 'Unauthorized access denied';

  constructor(
    private userProfileService: UserProfileService,
    private router: Router
  ) {}

  canLoad(route: Route) {
    if (this.userProfileService.isLoggedIn) {
      return true;
    }

    const url = `/${route.path}`;
    this.router.navigate(['/login'], { queryParams: { redirectTo: url } });
    console.warn(this.deniedMessage);
    return this.userProfileService.isLoggedIn;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userProfileService.isLoggedIn) {
      return true;
    }
    this.router.navigate(['/login'], {
      queryParams: { redirectTo: state.url }
    });
    console.warn(this.deniedMessage);
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
}
