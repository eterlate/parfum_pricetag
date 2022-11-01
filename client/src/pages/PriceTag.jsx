import React from 'react'

function PriceTag (props) {
    console.log(props)
    return(
        <div className='priceTag'>
            <h1 id='itemName'>{props.item.itemName}</h1>
            <h1 id='itemPrice'>{props.item.itemPrice}</h1>
            <div className='priceTagBottom'>
                <h1 id='docDate'>{props.item.docDate}</h1>
                <h1 id='itemCode'>{props.item.itemCode}</h1>
            </div>
        </div>
    )
}

export default PriceTag