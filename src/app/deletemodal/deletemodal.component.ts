import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-deletemodal',
  templateUrl: './deletemodal.component.html',
  styleUrl: './deletemodal.component.css'
})
export class DeletemodalComponent {
  constructor(private router: Router,
    private location: Location,
    public dialogRef: MatDialogRef<DeletemodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeModal(): void {
    this.dialogRef.close(false); // Close modal without confirming delete
  }

  confirmDelete(): void {
    this.dialogRef.close(true); // Confirm delete
    let storedValueFromLocalStorage: any = localStorage.getItem('employeeList');
    storedValueFromLocalStorage = JSON.parse(storedValueFromLocalStorage);
    storedValueFromLocalStorage = storedValueFromLocalStorage.filter((item: { email: string; }) => item.email !== this.data.email);
    localStorage.setItem("employeeList", JSON.stringify(storedValueFromLocalStorage));
    //window.location.reload();
    
  }
}
