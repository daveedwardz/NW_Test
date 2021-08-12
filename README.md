# Net Wealth Currency Test

## Backend
- Azure functions (in Typescript) access the Fixer API for currency data
- Probably spent too long implementing this - I have no experience of Azure but was tempted by the bonus points :)

## Frontend
- Angular 12
- Jasmine tests
- State persisted in CurrencyService (and localStorage)

If time would have allowed I would have ideally persisted the Currency Symbol data and Latest rates in Azure storage, but as mentioned, I have no prior experience of Azure and was cognisant of the fact that this was nmeant to be a frontend test.

[Demo](https://nw-currency-converter.azurewebsites.net)
