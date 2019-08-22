import { UserComponent } from './managements/user/user.component';
import { LoginComponent } from './login/login.component';

export const routes = [
    {
        path: '',
        redirectTo: 'app-login',
        pathMatch: 'full'
    },
    {
        path: 'app-login',
        component: LoginComponent
    },
    {
        path: 'app-user',
        component: UserComponent
    }
];

export const navigatableComponents = [
    LoginComponent,
    UserComponent
];
