import { NgModule } from '@angular/core';

declare const $: any;

@NgModule({
  exports: [],
  declarations: [],
  providers: []
})
export class Select2Module {
  constructor() {
    // Ensure jQuery and Select2 are loaded before using them
    if ($) {
      require('select2');
    } else {
      console.error('jQuery is not loaded!');
    }
  }
}