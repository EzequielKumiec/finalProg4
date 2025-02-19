import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OptimizationService } from '../optimization.service';
import { PlateWithCuts } from '../Models/PlateWithCuts';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  orders: any[] = [];
  selectedOrderId: string = '';
  selectedOrder: any = null;
  optimizedPlates: PlateWithCuts[] = [];

  constructor(private optimizationService: OptimizationService,
      private router: Router) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.optimizationService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  onOrderSelected() {
    this.selectedOrder = this.orders.find(order => order.id === this.selectedOrderId);
    this.optimizedPlates = [];
  }

  optimizeOrder() {
    if (this.selectedOrder) {
      this.optimizedPlates = this.optimizationService.optimizeCuts(this.selectedOrder.requestedCuts);
    }
  }

  formatDate(dateStr: string): string {
    const [day, month, year] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  }
  NuevaOrden(){
    this.router.navigate(['new-order']);
  }
}