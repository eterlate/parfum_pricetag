import React from 'react'

function BigPriceTag(props) {
    return (
        <>
            {props.item.percent != null ?
                <div className='priceTagBig'>
                    <h1 id='itemNameBig'>{props.item.itemName}</h1>
                    {props.item.percent < 10 ?
                        <h1 id='percentBig'></h1>
                        :
                        <h1 id='percentBig'>скидка {props.item.percent}%</h1>
                    }
                    <h1 id='itemPrice1Big'>{props.item.itemPrice}</h1>

                    <h1 id='oldPriceHeaderBig'>старая цена</h1>
                    <h1 id='oldPriceBig'>{props.item.itemPriceOld}</h1>
                    <div className='priceTagBottomBig'>
                        <h1 id='docDateBig'>{props.item.docDate}</h1>
                        <h1 id='itemCodeBig'>{props.item.itemCode}</h1>
                    </div>
                </div>
                :
                <div className='priceTagBig'>
                    <div className='top'>
                        <h1 id='itemNameBig'>{props.item.itemName}</h1>
                        <h1 id='itemPriceBig'>{props.item.itemPrice}</h1>
                    </div>
                    <div className='priceTagBottomBig'>
                        <h1 id='docDateBig'>{props.item.docDate}</h1>
                        <h1 id='itemCodeBig'>{props.item.itemCode}</h1>
                    </div>
                </div>
            }
        </>
    )
}

export default BigPriceTag