import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewOrderComponent } from './new-order/new-order.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new-order', component: NewOrderComponent },
  { path: '**', redirectTo: '' }
];