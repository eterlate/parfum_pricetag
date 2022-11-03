function formatDate(Sdate) {
    var date = new Date(Sdate)


    Day = date.getDate()
    Month = date.getMonth() + 1
    Year = date.getYear() + 1900
    if (parseInt(Day) < 10) {
        newDate = '0' + date.getDate()

    } else {
        newDate = date.getDate()
    }
    if (parseInt(Month) < 10) {
        newDate = newDate + '.' + '0' + Month + '.' + Year
    } else {
        newDate = newDate + '.' + Month + '.' + Year
    }
    return newDate
}

function formatPrice(wrongPrice) {
    strPrice = String(wrongPrice.toFixed(1))
    price = strPrice.replace('.', ',') + '0'
 
    return price
}

function percent(oldPrice, price){
    raw = 100 - (price * 100 / oldPrice)
    floor = Math.floor(raw)
    difference = String(floor)
    return difference
}

module.exports = { formatDate, formatPrice, percent };