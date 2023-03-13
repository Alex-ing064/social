import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from "./components/home/home.component";

const appRoutes : Routes  =[
    {
        path: '',component:HomeComponent
    }
];

export const appRoutingProviders :  any [] = [];
export const routing : ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
