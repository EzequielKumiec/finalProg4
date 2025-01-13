import { Component } from '@angular/core';
import { NewOrderComponent } from './new-order/new-order.component';

@Component({
  selector: 'app-root',
  imports: [NewOrderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cba-wood-company';
}
