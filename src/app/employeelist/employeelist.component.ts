import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import jsonArray from '../../model/data.js';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { DeletemodalComponent } from '../deletemodal/deletemodal.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css'
})
export class EmployeelistComponent {
  
  dataSource = jsonArray;
  storedValue: any[] = [];
  

 
  ngAfterViewInit() {
   let storedValueFromLocalStorage: any = localStorage.getItem('employeeList');
    if (storedValueFromLocalStorage) {
      console.log("ada");
      this.dataSource = JSON.parse(storedValueFromLocalStorage);
    } else {
      localStorage.setItem('employeeList', JSON.stringify(this.dataSource));
      storedValueFromLocalStorage = localStorage.getItem('employeeList');
      this.storedValue = storedValueFromLocalStorage;
    }
    setTimeout(()=>{   
      $('#datatableexample').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        lengthMenu : [5, 10, 25]
    } );
    }, 1);
  }

  handleButtonClick() {
    this.router.navigate(['/addnew']);
  }

  //to rupiah currency
  transform(value: number): string {
    const formattedValue = value.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    // Replace "IDR" with "Rp"
    return formattedValue.replace('IDR', 'Rp');
  }

  openDetailModal(data: any): void {
    this.dialog.open(ModalComponent, {
      width: '800px',
      data: data  // Pass data to the modal
    });
  }

  openDetailDeleteModal(data: any): void {
    this.dialog.open(DeletemodalComponent, {
      width: '800px',
      data: data  // Pass data to the modal
    });
  }
  
  constructor(private router: Router, private dialog: MatDialog) {}
}
