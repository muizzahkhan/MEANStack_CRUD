import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { StoresService } from '../shared/stores.service';
import { Stores } from '../shared/stores.model';

declare var M: any;

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css'],
  providers: [StoresService]
})
export class StoresComponent implements OnInit {

  constructor(public storesService: StoresService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }
  
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.storesService.selectedStores = {
      _id: "",
      name: "",
      type: "",
      city: "",
      phone: null
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.storesService.postStores(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.storesService.putStores(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  
  refreshEmployeeList() {
    this.storesService.getStoresList().subscribe((res) => {
      this.storesService.stores = res as Stores[];
    });
  }

  onEdit(emp: Stores) {
    this.storesService.selectedStores = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.storesService.deleteStores(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}