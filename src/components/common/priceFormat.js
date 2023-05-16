export function priceFormat(price){
    let priceFormat = new Intl.NumberFormat('sr-Latn-RS', {
        style: 'currency',
        currency: 'RSD',
        currencyDisplay: 'narrowSymbol',
        minimumFractionDigits: 2
    });

    return priceFormat.format(price)
}
