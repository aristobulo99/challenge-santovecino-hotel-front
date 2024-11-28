import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AvailabilityComponent } from './pages/availability/availability.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'availability',
        component: AvailabilityComponent
    },
    {
        path:'**',
        redirectTo: '/home'
    }
];

@NgModule(
    {
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule],
    }
) export class AppRoutingModule{}
