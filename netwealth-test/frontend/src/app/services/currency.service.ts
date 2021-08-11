import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { FixerApiService } from './fixer-api.service';
import { Currency } from '../models/Currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor( private fixer: FixerApiService ) { }

  private _currencies: Currency[] = [];
  private numFavourites = 5;

  public get currencies$(): Observable<Currency[]> {
    if (this._currencies.length === 0) {
      if (this.sessionCurrencies === null) {
        return this.fixer.getCurrencies().pipe(
          map(symbols => {
            this._currencies = Object.keys(symbols).map(
              (symbol: string) => new Currency({ symbol: symbol, description: symbols[symbol] })
            );
            this.sessionCurrencies = this._currencies;
            return this._currencies;
          })
        );
      }
      else {
        this._currencies = this.sessionCurrencies;
      }
    }
    return of(this._currencies);
  }

  public getSortedCurrencies$(type:string): Observable<Currency[]> {
    return this.currencies$.pipe(
      map(currencies => {
        let favouriteCurrencies = currencies.filter(
          currency => (type === "from" ? currency.usedFromCount : currency.usedToCount) > 0
        );
        favouriteCurrencies.sort( (a, b) => this.sortByUsed(a, b, type));
        if (favouriteCurrencies.length > this.numFavourites) {
          favouriteCurrencies = favouriteCurrencies.slice(0, this.numFavourites)
        }

        currencies = currencies.filter(currency => {
          return favouriteCurrencies.find(favCurrency => favCurrency.symbol === currency.symbol) === undefined
        });

        return favouriteCurrencies.map( favourite => Object.assign(favourite, { isFavourite: true }) )
        .concat(
          currencies.map( favourite => Object.assign(favourite, { isFavourite: false }) )
          .sort((a, b) => this.sortBySymbol(a, b))
        );
      })
    );
  }

  private sortByUsed = (a: Currency, b: Currency, type: string): number =>
    type === "from" ? b.usedFromCount - a.usedFromCount : b.usedToCount - a.usedToCount;

  private sortBySymbol = (a: Currency, b: Currency): number =>
    a.symbol === b.symbol ? 0 : a.symbol > b.symbol ? 1 : -1; 

  public getCurrency(symbol: string, type: string) {
    let currency = this._currencies.find(currency => currency.symbol === symbol);
    if (currency) {
      if (type === "from") { currency.usedFromCount++ }
      else { currency.usedToCount++ }
      this.sessionCurrencies = this._currencies;
      return currency;
    }
    return null;
  }

  private get sessionCurrencies() {
    let sessionCurrencies = sessionStorage.getItem("currencies");
    return sessionCurrencies === null ? null : JSON.parse(sessionCurrencies);
  }
  private set sessionCurrencies(currencies: Currency[]) {
    sessionStorage.setItem("currencies", JSON.stringify(currencies));
  }
}
