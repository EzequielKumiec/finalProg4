import { Component } from '@angular/core';
import { NewOrderComponent } from './new-order/new-order.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [NewOrderComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cba-wood-company';
}
