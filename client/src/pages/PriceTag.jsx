import React from 'react'

function PriceTag(props) {
    return (
        <>
            {props.item.percent != null ?
                <div className='priceTag'>
                    <h1 id='itemName'>{props.item.itemName}</h1>
                    <div>
                        <h1 id='percent'>Скидка: {props.item.percent}%</h1>
                        <h1 id='itemPrice1'>{props.item.itemPrice}</h1>
                    </div>
                    <div>
                        <h1 id='oldPriceHeader'>Старая цена</h1>
                        <h1 id='oldPrice'>{props.item.itemPriceOld}</h1>
                    </div>
                    <div className='priceTagBottom'>
                        <h1 id='docDate'>{props.item.docDate}</h1>
                        <h1 id='itemCode'>{props.item.itemCode}</h1>
                    </div>
                </div>
                :
                <div className='priceTag'>
                    <h1 id='itemName'>{props.item.itemName}</h1>
                    <h1 id='itemPrice'>{props.item.itemPrice}</h1>
                    <div className='priceTagBottom'>
                        <h1 id='docDate'>{props.item.docDate}</h1>
                        <h1 id='itemCode'>{props.item.itemCode}</h1>
                    </div>
                </div>
            }
        </>
    )
}

export default PriceTag