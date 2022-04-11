import { Injectable } from '@angular/core';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filterSetting
  constructor() { }

  setFilterSetting(filterSetting){
    this.filterSetting = filterSetting
  }
}
