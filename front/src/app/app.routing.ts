import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from "./components/home/home.component";
import { RegistroComponent } from "./components/registro/registro.component";
import { LoginComponent } from "./components/login/login.component";
import { ConfiguracionUsuarioComponent } from "./components/cuenta/configuracion-usuario/configuracion-usuario.component";

const appRoutes: Routes = [
    {
        path: '', component: HomeComponent


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

        path: 'cuenta/configuracion', component: ConfiguracionUsuarioComponent

    }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
