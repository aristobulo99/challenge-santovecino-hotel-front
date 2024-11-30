import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AvailabilityComponent } from './pages/availability/availability.component';
import { headerControlGuard } from './core/guard/header-control/header-control.guard';
import { MyReservationsComponent } from './pages/my-reservations/my-reservations.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [headerControlGuard]
    },
    {
        path: 'availability',
        component: AvailabilityComponent,
        canActivate: [headerControlGuard]
    },
    {
        path: 'my-reservations',
        component: MyReservationsComponent,
        canActivate: [headerControlGuard]
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
