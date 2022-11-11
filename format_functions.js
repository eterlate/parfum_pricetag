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

function percent(oldPrice, price) {
    if (oldPrice <= price) {
        return null
    }
    raw = 100 - (price * 100 / oldPrice)
    floor = Math.floor(raw)
    difference = String(floor)
    return difference
}

function headerCheck(docNumber) {
    lastTwo = docNumber.substring(docNumber.length - 2)
    itog = {
        header: '',
        color: ''
    }
    switch (lastTwo) {
        case '01':
            itog.header = 'Повышение цен, Оранжевый ценник'
            itog.color = 'orange'
            break
        case '02':
            itog.header = 'Повышение цен, Белый ценник'
            itog.color = 'white'
            break
        case '03':
            itog.header = 'Понижение цен, Оранжевый ценник'
            itog.color = 'orange'
            break
        case '04':
            itog.header = 'Понижение цен, Белый ценник'
            itog.color = 'white'
            break
        case '05':
            itog.header = 'Цена не изменилась, Оранжевый ценник'
            itog.color = 'orange'
            break
        case '06':
            itog.header = 'Цена не изменилась, Белый ценник'
            itog.color = 'white'
            break
        case '99':
            itog.header = 'Нет изменений в цвете ценника и цены номенклатуры в документе'
            itog.color = 'white'
            break
        default:
            itog.header = ''
            itog.color = ''
            return itog
    }
    return itog
}

module.exports = { formatDate, formatPrice, percent, headerCheck };