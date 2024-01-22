import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import jsonArray from '../../model/data.js';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { DeletemodalComponent } from '../deletemodal/deletemodal.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css',
})
export class EmployeelistComponent {
  groupOptions = ['Group A', 'Group B', 'Group C', 'Group D', 'Group E', 'Group F', 'Group G', 'Group H', 'Group I', 'Group J'];
  editform: any = FormGroup;
  submitted = false;
  dataSource = jsonArray;
  dataForDetailModal: any = {};
  storedValue: any[] = [];

  get f() {
    return this.editform.controls;
  }

  ngAfterViewInit() {
    let storedValueFromLocalStorage: any = localStorage.getItem('employeeList');
    if (storedValueFromLocalStorage) {
      console.log('ada');
      this.dataSource = JSON.parse(storedValueFromLocalStorage);
    } else {
      localStorage.setItem('employeeList', JSON.stringify(this.dataSource));
      storedValueFromLocalStorage = localStorage.getItem('employeeList');
      this.storedValue = storedValueFromLocalStorage;
    }
    setTimeout(() => {
      $('#datatableexample').DataTable({
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        lengthMenu: [5, 10, 25],
      });
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
      maximumFractionDigits: 0,
    });

    // Replace "IDR" with "Rp"
    return formattedValue.replace('IDR', 'Rp');
  }

  openDetailModal(data: any): void {
    console.log('data + ' + data.email);
    const modelDiv = document.getElementById('modalDetail');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
      this.dataForDetailModal = data;
    }
  }

  closeDetailModal(): void {
    const modelDiv = document.getElementById('modalDetail');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  openDetailDeleteModal(data: any): void {
    const modelDiv = document.getElementById('deleteModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
      this.dataForDetailModal = data;
    }
  }

  closeDetailDeleteModal(): void {
    const modelDiv = document.getElementById('deleteModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  confirmDelete() {
    let storedValueFromLocalStorage: any = localStorage.getItem('employeeList');
    storedValueFromLocalStorage = JSON.parse(storedValueFromLocalStorage);
    storedValueFromLocalStorage = storedValueFromLocalStorage.filter(
      (item: { email: string }) => item.email !== this.dataForDetailModal.email
    );
    localStorage.setItem(
      'employeeList',
      JSON.stringify(storedValueFromLocalStorage)
    );
    const modelDiv = document.getElementById('deleteModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
      alert('BERHASIL MENGHAPUS DATA');
    }
    window.location.reload();
  }

  openEditModal(data: any): void {
    const modelDiv = document.getElementById('editModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
      this.dataForDetailModal = data;
      this.editform.patchValue({
        id: this.dataForDetailModal.id,
        firstName: this.dataForDetailModal.firstName,
        lastName: this.dataForDetailModal.username,
        username: this.dataForDetailModal.lastName,
        email: this.dataForDetailModal.email,
        group: this.dataForDetailModal.group,
        birthDate: this.dataForDetailModal.birthDate,
        basicSalary: this.dataForDetailModal.basicSalary,
        description: this.dataForDetailModal.description,
        status: this.dataForDetailModal.status,
      });
    }
  }

  closeEditModal(): void {
    const modelDiv = document.getElementById('editModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.editform.invalid) {
      return;
    } else {
      this.editform.value;
      let storedValueFromLocalStorage: any =
        localStorage.getItem('employeeList');
      storedValueFromLocalStorage = JSON.parse(storedValueFromLocalStorage);
     
      for (let i = 0; i < storedValueFromLocalStorage.length; i++) {
        if (storedValueFromLocalStorage[i].id == this.editform.value.id) {
          storedValueFromLocalStorage[i].firstName =
            this.editform.value.firstName;
        }
      }
      localStorage.setItem(
        'employeeList',
        JSON.stringify(storedValueFromLocalStorage)
      );
      const modelDiv = document.getElementById('editModal');
      if (modelDiv != null) {
        modelDiv.style.display = 'none';
        alert("Berhasil Mengubah Data!")
        window.location.reload();
      }
    }
  }

  ngOnInit() {
    //Add User form validations
    this.editform = this.formBuilder.group({
      id: [
        { value: this.dataForDetailModal.id, readonly: true },
        [Validators.required],
      ],
      firstName: [
        { value: this.dataForDetailModal.firstName },
        [Validators.required],
      ],
      lastName: [
        { value: this.dataForDetailModal.lastName },
        [Validators.required],
      ],
      username: [
        { value: JSON.stringify(this.dataForDetailModal.username) },
        [Validators.required],
      ],
      email: [
        { value: JSON.stringify(this.dataForDetailModal.email) },
        [Validators.required, Validators.email],
      ],
      birthDate: [
        { value: this.dataForDetailModal.birthDate, readonly: true },
        [Validators.required],
      ],
      group: [{ value: this.dataForDetailModal.group }, [Validators.required]],
      status: [
        { value: this.dataForDetailModal.status },
        [Validators.required],
      ],
      description: [
        { value: this.dataForDetailModal.description },
        [Validators.required],
      ],
      basicSalary: [
        { value: this.dataForDetailModal.salary },
        [Validators.required],
      ],
    });
  }

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}
}
