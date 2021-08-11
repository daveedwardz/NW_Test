export class Currency {
    symbol: string;
    description: string;
    usedFromCount: number;
    usedToCount: number;
    isFavourite?: boolean;

    constructor(currency: any) {
        this.symbol = currency.symbol;
        this.description = currency.description;
        this.usedFromCount = currency.usedFromCount || 0;
        this.usedToCount = currency.usedToCount || 0;
    }
}