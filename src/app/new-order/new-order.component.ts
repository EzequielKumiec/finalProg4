import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

interface Provider {
  id: string;
  name: string;
}

interface Color {
  id: string;
  name: string;
  providerId: string;
}

interface Cut {
  width: number;
  height: number;
}

interface Order {
  deliveryDate: string;
  client: string;
  username: string;
  providerId: string;
  providerColorId: string;
  requestedCuts: Cut[];
}

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class NewOrderComponent implements OnInit {
  orderForm: FormGroup;
  providers: Provider[] = [];
  colors: Color[] = [];
  readonly PLATE_WIDTH = 800;
  readonly PLATE_HEIGHT = 600;
  readonly MAX_CUTS = 10;
  readonly MAX_CUTS_PER_DAY = 20;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      client: ['', [Validators.required, Validators.maxLength(30)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      deliveryDate: ['', [Validators.required]],
      providerId: ['', [Validators.required]],
      providerColorId: ['', [Validators.required]],
      requestedCuts: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadProviders();
    this.watchProviderChanges();
    this.addCut(); 
  }

  private loadProviders(): void {
    this.http.get<Provider[]>('https://6317ca93f6b281877c5d7785.mockapi.io/providers')
      .subscribe(providers => {
        this.providers = providers;
      });
  }

  private watchProviderChanges(): void {
    this.orderForm.get('providerId')?.valueChanges
      .pipe(
        switchMap(providerId => 
          this.http.get<Color[]>(`https://6317ca93f6b281877c5d7785.mockapi.io/providers/${providerId}/colors`)
        )
      )
      .subscribe(colors => {
        this.colors = colors;
        this.orderForm.patchValue({ providerColorId: '' });
      });
  }

  get cutsFormArray(): FormArray {
    return this.orderForm.get('requestedCuts') as FormArray;
  }

  createCutGroup(): FormGroup {
    return this.fb.group({
      width: ['', [Validators.required, Validators.max(this.PLATE_WIDTH)]],
      height: ['', [Validators.required, Validators.max(this.PLATE_HEIGHT)]]
    });
  }

  addCut(): void {
    if (this.cutsFormArray.length < this.MAX_CUTS) {
      this.cutsFormArray.push(this.createCutGroup());
    }
  }

  removeCut(index: number): void {
    this.cutsFormArray.removeAt(index);
  }

  async validateDeliveryDate(date: string): Promise<boolean> {
    const response = await this.http.get<Order[]>('https://674531d6b4e2e04abea50775.mockapi.io/orders').toPromise();
    const orders = response || [];
    
    const cutsOnSelectedDate = orders
      .filter(order => order.deliveryDate === date)
      .reduce((total, order) => total + order.requestedCuts.length, 0);

    return (cutsOnSelectedDate + this.cutsFormArray.length) <= this.MAX_CUTS_PER_DAY;
  }

  async onSubmit(): Promise<void> {
    if (this.orderForm.valid) {
      const deliveryDate = this.orderForm.get('deliveryDate')?.value;
      const isDateValid = await this.validateDeliveryDate(deliveryDate);

      if (!isDateValid) {
        alert('La fecha seleccionada excede el límite de cortes diarios permitidos');
        return;
      }

      const order: Order = {
        ...this.orderForm.value,
        deliveryDate: this.formatDate(deliveryDate)
      };

      this.http.post('https://674531d6b4e2e04abea50775.mockapi.io/orders', order)
  .subscribe({
    next: () => {
      this.router.navigate(['']); 
    },
    error: (err) => {
      console.error('Error al crear el pedido:', err);
      alert('Hubo un problema al crear el pedido. Inténtalo de nuevo.');
    }
  });
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  private formatDate(date: string): string {
    const d = new Date(date);
    
    const day = d.getUTCDate();
    const month = d.getUTCMonth() + 1; 
    const year = d.getUTCFullYear();
  
    return `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
  }
  
}