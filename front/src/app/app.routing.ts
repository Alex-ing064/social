import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from "./components/home/home.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { LoginComponent } from "./components/login/login.component";
import { ConfiguracionUsuarioComponent } from "./components/cuenta/configuracion-usuario/configuracion-usuario.component";
import { PasswordUsuarioComponent } from "./components/cuenta/password-usuario/password-usuario.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { AuthGuard } from "./guards/auth.guard";
import { InvitacionesUsuarioComponent } from "./components/cuenta/invitaciones-usuario/invitaciones-usuario.component";
import { UsuariosComponent } from "./components/usuarios/usuarios.component";
import { PerfilComponent } from "./components/cuenta/perfil/perfil.component";
import { SidebarPerfilComponent } from "./components/cuenta/sidebar-perfil/sidebar-perfil.component";

const appRoutes: Routes = [
    {
        path: '', component: HomeComponent, canActivate: [AuthGuard]


    }
    ,
    {

        path: 'registro', component: RegistroComponent

    }
    ,
    {

        path: 'login', component: LoginComponent

    }
    ,
    {

        path: 'reset-account', component: ResetPasswordComponent

    }
    ,
    {

        path: 'cuenta/configuracion', component: ConfiguracionUsuarioComponent, canActivate: [AuthGuard]

    }
    ,
    {

        path: 'cuenta/password', component: PasswordUsuarioComponent, canActivate: [AuthGuard]

    },
    {

        path: 'cuenta/invitaciones', component: InvitacionesUsuarioComponent, canActivate: [AuthGuard]

    },
    {

        path: 'search', component:  UsuariosComponent, canActivate: [AuthGuard]

    },
    {

        path: 'cuenta/:username', component:  SidebarPerfilComponent, canActivate: [AuthGuard]

    }
    
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
