import { Component } from '@angular/core';

import { Currency } from './models/Currency';
import { FixerApiService } from './services/fixer-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private fixerApi: FixerApiService
  ) { }

  converting = false;
  amount: number = 1.00;
  fromCurrency!: Currency;
  toCurrency!: Currency;
  fromValue = '';
  toValue = '';
  converted: number = 0;

  changeCurrency(currency: Currency, type: string) {
    if (type === "from") {
      this.fromCurrency = currency
    }
    else {
      this.toCurrency = currency
    }
    this.doConversion(this.amount, this.fromCurrency, this.toCurrency)
  }
  changeAmount(event: any) {
    this.amount = Math.floor(parseFloat(event.target.value) * 100) / 100;
    this.doConversion(this.amount, this.fromCurrency, this.toCurrency)
  }

  doConversion(amount: number, from: Currency, to: Currency) {
    if (amount === 0 || from === undefined || to === undefined) { return }

    this.converting = true;
    this.fixerApi.convert(amount, from.symbol, to.symbol).subscribe(
      convertedAmount => {
        this.converting = false;
        this.converted = convertedAmount;
      }
    );
  }

  swapCurrencies() {
    if (this.fromCurrency !== undefined && this.toCurrency !== undefined) {
      [ this.fromValue, this.toValue ] = [ this.toCurrency.symbol, this.fromCurrency.symbol ];
      [ this.fromCurrency, this.toCurrency ] = [ this.toCurrency, this.fromCurrency ];
      this.doConversion(this.amount, this.fromCurrency, this.toCurrency)
    }
  }
}

