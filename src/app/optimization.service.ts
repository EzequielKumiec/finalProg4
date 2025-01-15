import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cut } from "../app/Models/Cut";
import { PlateWithCuts } from "../app/Models/PlateWithCuts";

@Injectable({
  providedIn: 'root'
})
export class OptimizationService {
  private readonly PLATE_WIDTH = 800;
  private readonly PLATE_HEIGHT = 600;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>('https://674531d6b4e2e04abea50775.mockapi.io/orders');
  }

  optimizeCuts(cuts: Cut[]): PlateWithCuts[] {
    const sortedCuts = [...cuts].sort((a, b) => 
      (b.width * b.height) - (a.width * a.height)
    );
  
    const plates: PlateWithCuts[] = [];
    let currentPlate: Cut[] = [];
    let currentUsedArea = 0;
    const plateArea = this.PLATE_WIDTH * this.PLATE_HEIGHT;
  
    const canFitCut = (cut: Cut, plate: Cut[]): boolean => {
      const totalArea = plate.reduce((sum, c) => sum + (c.width * c.height), 0);
      const newArea = totalArea + (cut.width * cut.height);
      return newArea <= plateArea;
    };
  
    sortedCuts.forEach(cut => {
      if (!currentPlate.length || !canFitCut(cut, currentPlate)) {
        if (currentPlate.length) {
          plates.push(this.createPlateWithMetrics(currentPlate));
        }
        currentPlate = [cut];
        currentUsedArea = cut.width * cut.height;
      } else {
        currentPlate.push(cut);
        currentUsedArea += cut.width * cut.height;
      }
    });
  
    if (currentPlate.length) {
      plates.push(this.createPlateWithMetrics(currentPlate));
    }
  
    console.log(plates);  // Verifica la salida aquí
  
    return plates;
  }

  private createPlateWithMetrics(cuts: Cut[]): PlateWithCuts {
    const totalArea = this.PLATE_WIDTH * this.PLATE_HEIGHT;
    const usedArea = cuts.reduce((sum, cut) => sum + (cut.width * cut.height), 0);
    
    return {
      cuts,
      usedArea,
      totalArea,
      efficiency: (usedArea / totalArea) * 100
    };
  }
}