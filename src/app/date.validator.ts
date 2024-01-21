import { AbstractControl } from '@angular/forms';

export function maxDateTodayValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const selectedDate = control.value;

  if (selectedDate && selectedDate > new Date()) {
    return { 'maxDateToday': true };
  }

  return null;
}