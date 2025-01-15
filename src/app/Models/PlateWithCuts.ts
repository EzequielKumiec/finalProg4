import { Cut } from "./Cut";

export interface PlateWithCuts {
  cuts: Cut[];
  usedArea: number;
  totalArea: number;
  efficiency: number;
}