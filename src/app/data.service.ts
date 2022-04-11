import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  healthData

  provinces = ["Alberta", "BC", "Manitoba", "New Brunswick", "NL", "NWT", "Nova Scotia", "Nunavut", "Ontario", "PEI", "Quebec", "Saskatchewan", "Yukon", "Repatriated"]

  constructor() { }

  setHealthData():void{
     
  }

  setData(data):void{
    this.healthData = data
    let grouped = this.groupBy(data, data => data.health_region)
    grouped.forEach((item) => {
      console.log(item)
    })
  }


  groupBy(list, keyGetter) {
		const map = new Map()
		list.forEach((item) => {
			const key = keyGetter(item)
			const collection = map.get(key);
			if (!collection) {
				map.set(key, [item])
			}
			else {
				collection.push(item)
			}
		})
		return map
	}
}
