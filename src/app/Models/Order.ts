import { Cut } from "./Cut";

export interface Order {
    deliveryDate: string;
    client: string;
    username: string;
    providerId: string;
    providerColorId: string;
    requestedCuts: Cut[];
  }