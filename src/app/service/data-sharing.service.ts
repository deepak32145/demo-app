import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataSharingService {
  private dataSubject = new BehaviorSubject<any>(null);
  constructor() {}
  public data$ = this.dataSubject.asObservable();
}
