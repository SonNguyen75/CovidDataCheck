import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FilterService } from '../filter.service';
import { TableComponent } from '../table/table.component';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
	form:FormGroup;

	constructor(private fs:FilterService, private tb:TableComponent) {
		this.form = new FormGroup({
			startDate: new FormControl(''),
			endDate: new FormControl(''),
			newCasesCheck: new FormControl(false),
			cumulativeCasesCheck: new FormControl(false),
			newDeathsCheck: new FormControl(false),
			cumulativeDeathsCheck: new FormControl(false),
			newRecoveredCheck: new FormControl(false),
			cumulativeRecoveredCheck: new FormControl(false),
			federalCheck: new FormControl(false),
			provincialCheck: new FormControl(false),
			regionalCheck: new FormControl(false)
		})
	 }

	ngOnInit(): void {}

	onSubmit(filterSelection){
		this.fs.setFilterSetting(filterSelection)
		this.tb.updateTable(filterSelection)
	}

	uncheck():void{	
		

	}
}
