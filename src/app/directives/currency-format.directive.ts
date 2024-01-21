import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCurrencyFormat]'
})
export class CurrencyFormatDirective {

 
    constructor(private el: ElementRef) {}

    @HostListener('input', ['$event'])
    onInput(event: Event): void {
      const inputElement = this.el.nativeElement as HTMLInputElement;
      let inputValue = inputElement.value;
  
      // Remove non-numeric characters
      inputValue = inputValue.replace(/[^0-9]/g, '');
  
      // Format the numeric value as currency in IDR (Indonesian Rupiah)
      const formattedValue = this.formatAsRupiah(parseInt(inputValue, 10));
  
      // Update the input field value with the formatted currency
      inputElement.value = formattedValue;
    }
  
    formatAsRupiah(value: number): string {
      const formattedValue = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(value);
  
      // Remove the currency symbol if needed
      return formattedValue.replace('IDR', '');
    }
}