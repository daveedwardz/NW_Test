import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-currency-picker',
  templateUrl: './currency-picker.component.html',
  styleUrls: ['./currency-picker.component.css']
})
export class CurrencyPickerComponent {

  constructor(
    public currency: CurrencyService
  ) { }

  @Input() type = '';
  @Input() setValue = '';
  @Output() changeCurrency = new EventEmitter<any>(true);

  selectCurrency = (option: MatSelectChange) =>
    this.changeCurrency.emit(this.currency.getCurrency(option.value, this.type))
}
