import { CanActivateFn, Router } from "@angular/router"
import { inject } from "@angular/core"
import { AuthService } from "../services/auth.service"


export const authGuard: CanActivateFn = (route, state) => {
    let auth = inject(AuthService);
    let router = inject(Router);
    let authenticated = auth.user()!=null;
    if(!authenticated)
        router.navigate(['/login'])
    return authenticated;
}