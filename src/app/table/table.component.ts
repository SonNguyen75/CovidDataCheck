import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
	title = 'httpApp';
	d: any;
	province_data = [];
	constructor(private http: HttpClient, private ds:DataService) { }

	ngOnInit(): void {
		document.getElementById("timePeriod")?.append("Time Period: 03-03-2022")
		let loc = "prov"
		let url = "https://api.opencovid.ca/summary?date=03-03-2022"
		this.http.get<Object>(url).subscribe((data) => {
			this.d = data
			this.d.summary.forEach((e: any) => {
				let newRow = document.createElement("tr")
				let provinces = document.createElement("th")
				provinces.textContent = e.province
				newRow.append(provinces)
				let newCases = document.createElement("td")
				newCases.textContent = e.cases
				newRow.append(newCases)
				let newDeaths = document.createElement("td")
				newDeaths.textContent = e.deaths
				newRow.append(newDeaths)
				let newRecovered = document.createElement("td")
				newRecovered.textContent = e.recovered
				newRow.append(newRecovered)
				document.getElementById("table-body")?.append(newRow)
			})
		})
	}

	updateTable(tableSetting):void{
		document.getElementById("timePeriod").innerHTML = ""
		document.getElementById("timePeriod")?.append("Time Period:" + tableSetting.startDate + " to " + tableSetting.endDate)
		let loc:string
		let tableHeadRow = document.getElementById("table-head-row")
		tableHeadRow.innerHTML = ""
		document.getElementById("table-body").innerHTML = ""
		let province = document.createElement("th")
		province.innerHTML = "Provinces"
		tableHeadRow.append(province)
		if (tableSetting.federalCheck) {
			loc = "canada"
		}
		else if (tableSetting.provincialCheck) {
			loc = "prov"
		}
		else {
			loc = "hr"
			let region = document.createElement("th")
			region.innerHTML = "Region"
			tableHeadRow.append(region)
		}
		
		if (tableSetting.newCasesCheck){
			let newHead = document.createElement("th")
			newHead.textContent = "New Cases"
			tableHeadRow.append(newHead)
		}

		if (tableSetting.cumulativeCasesCheck){
			let newHead = document.createElement("th")
			newHead.textContent = "Cumulative Cases"
			tableHeadRow.append(newHead)
		}

		if (tableSetting.newDeathsCheck){
			let newHead = document.createElement("th")
			newHead.textContent = "New Deaths"
			tableHeadRow.append(newHead)
		}

		if (tableSetting.cumulativeDeathsCheck){
			let newHead = document.createElement("th")
			newHead.textContent = "Cumulative Deaths"
			tableHeadRow.append(newHead)
		}

		if (tableSetting.newRecoveredCheck){
			let newHead = document.createElement("th")
			newHead.textContent = "New Recovered"
			tableHeadRow.append(newHead)
		}

		if (tableSetting.cumulativeCasesCheck){
			let newHead = document.createElement("th")
			newHead.textContent = "Cumulative Recovered"
			tableHeadRow.append(newHead)
		}

		let url = "https://api.opencovid.ca/summary?" + "loc=" + loc + "&after=" + tableSetting.startDate + "&before=" + tableSetting.endDate
		this.http.get<Object>(url).subscribe((data) => {
			this.d = data
			let covidData = this.d.summary
			if (tableSetting.federalCheck || tableSetting.provincialCheck) {
				let groupedData = this.groupBy(covidData, covidData => covidData.province)
				groupedData.forEach((item) => {
					let newRow = document.createElement("tr")
					let provinces = document.createElement("th")
					provinces.textContent = item[0].province
					newRow.append(provinces)
					if (tableSetting.newCasesCheck){
						let newCases = document.createElement("td")
						newCases.textContent = this.calculateNewCases(item).toString()
						newRow.append(newCases)
						
					}
					if (tableSetting.cumulativeCasesCheck) {
						let cumulativeCase = document.createElement("td")
						cumulativeCase.textContent = item[item.length - 1].cumulative_cases
						newRow.append(cumulativeCase)
					}

					if (tableSetting.newCasesCheck){
						let newDeaths = document.createElement("td")
						newDeaths.textContent = this.calculateNewDeaths(item).toString()
						newRow.append(newDeaths)
					}

					if (tableSetting.cumulativeDeathsCheck) {
						let cumulativeDeaths = document.createElement("td")
						cumulativeDeaths.textContent = item[item.length - 1].cumulative_deaths
						newRow.append(cumulativeDeaths)
					}

					if (tableSetting.newRecoveredCheck){
						let newRecovered = document.createElement("td")
						newRecovered.textContent = this.calculateNewRecovered(item).toString()
						newRow.append(newRecovered)
					}

					if (tableSetting.cumulativeRecoveredCheck) {
						let cumulativeDeaths = document.createElement("td")
						cumulativeDeaths.textContent = item[item.length - 1].cumulative_recovered
						newRow.append(cumulativeDeaths)
					}
					document.getElementById("table-body")?.append(newRow)
				})
				
			}
			if (tableSetting.regionalCheck) {
				let groupedData = this.groupBy(covidData, covidData => covidData.province)
				groupedData.forEach((groupedItem) => {
					let regionalData = this.groupBy(groupedItem, groupedItem => groupedItem.health_region)
					regionalData.forEach((item) => {
						console.log(item)
						let newRow = document.createElement("tr")
						let provinces = document.createElement("th")
						provinces.textContent = item[0].province
						newRow.append(provinces)
						let regions = document.createElement("td")
						regions.textContent = item[0].health_region
						newRow.append(regions)
						if (tableSetting.newCasesCheck){
							let newCases = document.createElement("td")
							newCases.textContent = this.calculateNewCases(item).toString()
							newRow.append(newCases)
							
						}
						if (tableSetting.cumulativeCasesCheck) {
							let cumulativeCase = document.createElement("td")
							cumulativeCase.textContent = item[item.length - 1].cumulative_cases
							newRow.append(cumulativeCase)
						}
	
						if (tableSetting.newCasesCheck){
							let newDeaths = document.createElement("td")
							newDeaths.textContent = this.calculateNewDeaths(item).toString()
							newRow.append(newDeaths)
						}
	
						if (tableSetting.cumulativeDeathsCheck) {
							let cumulativeDeaths = document.createElement("td")
							cumulativeDeaths.textContent = item[item.length - 1].cumulative_deaths
							newRow.append(cumulativeDeaths)
						}
						document.getElementById("table-body")?.append(newRow)
					})
				})
			}
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
	
	calculateNewCases(data):number {
		let newCases:number = 0
		for(let i = 0; i < data.length;i++){
			newCases += data[i].cases
		}
		return newCases
	}

	calculateNewDeaths(data):number {
		let newCases:number = 0
		for(let i = 0; i < data.length;i++){
			newCases += data[i].deaths
		}
		return newCases
	}

	calculateNewRecovered(data):number {
		let newCases:number = 0
		for(let i = 0; i < data.length;i++){
			newCases += data[i].recovered
		}
		return newCases
	}
}

