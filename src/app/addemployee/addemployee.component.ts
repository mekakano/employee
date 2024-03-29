import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { maxDateTodayValidator } from '../date.validator';
import jsonArray from '../../model/data.js';
import { existingJsonArray } from '../../model/data2';
import { Router } from '@angular/router';
import { Select2Option, Select2UpdateEvent } from 'ng-select2-component';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrl: './addemployee.component.css',
})
export class AddemployeeComponent {
  @Output() newItemAdded = new EventEmitter<any>();
  dataSource = existingJsonArray;
  @ViewChild('picker') picker: any;
  form: any = FormGroup;
  submitted = false;
  storedValue: any[] = [];
  constructor(private formBuilder: FormBuilder, private router: Router) {}
  //Add user form actions
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      console.log('invalid');
      return;
    } else {
      console.log('valid');
      console.log('Form submitted:', this.form.value);

      let storedValueFromLocalStorage: any =
        localStorage.getItem('employeeList');
      if (storedValueFromLocalStorage) {
        this.storedValue = JSON.parse(storedValueFromLocalStorage);
        let email = this.form.get('email').value;
        let firstName = this.form.get('firstName').value;
        let lastName = this.form.get('lastName').value;
        let birthDate = this.form.get('birthDate').value;
        let basicSalary = this.form.get('basicSalary').value;
        let group = this.form.get('group').value;
        let status = this.form.get('status').value;
        let description = this.form.get('description').value;
        let username = firstName + lastName;
        console.log(firstName);
        this.storedValue.push({
          username: username,
          firstName: firstName,
          lastName: lastName,
          email: email,
          birthDate: birthDate,
          basicSalary: basicSalary,
          status: status,
          group: group,
          description: description,
        });
        if (this.storedValue.length > 0) {
          localStorage.setItem(
            'employeeList',
            JSON.stringify(this.storedValue)
          );
        }
        this.form.reset();
        this.form.markAsPristine();
        this.form.markAsUntouched();
      } else {
        localStorage.setItem('employeeList', JSON.stringify(this.dataSource));
        storedValueFromLocalStorage = localStorage.getItem('employeeList');
        this.storedValue = storedValueFromLocalStorage;

        //let users: any[] = this.storedValue ? JSON.parse(this.storedValue) : [this.dataSource];
      }
      alert('Berhasil Tambah Data');
      window.location.reload;
    }
  }

  ngOnInit() {
    //Add User form validations
    this.form = this.formBuilder.group({
      basicSalary: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: [
        '',
        [Validators.required, this.maxDateTodayValidator.bind(this)],
      ],
      status: ['', [Validators.required]],
      group: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  maxDateTodayValidator(control: any) {
    const birthDate = control.value;
    const today = new Date();

    return birthDate && new Date(birthDate) > today
      ? { maxDateToday: true }
      : null;
  }

  handleButtonClick() {
    this.router.navigate(['/dashboard']);
  }

  data1: any = [
    {
      label: '--PILIH--',
      options: [
        { value: 'Group J', label: 'Group J' },
        { value: 'Group I', label: 'Group I' },
        { value: 'Group H', label: 'Group H' },
        { value: 'Group G', label: 'Group G' },
        { value: 'Group F', label: 'Group F' },
        { value: 'Group E', label: 'Group E' },
        { value: 'Group D', label: 'Group D' },
        { value: 'Group C', label: 'Group C' },
        { value: 'Group B', label: 'Group B' },
        { value: 'Group A', label: 'Group A' },
      ],
    },
  ];
 
  search(text: string) {
    this.data1 = text
      ? (JSON.parse(JSON.stringify(this.data1)) as Select2Option[]).filter(
          (option) =>
            option.label.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      : JSON.parse(JSON.stringify(this.data1));
  }
  value1 = 'Group A';
}
