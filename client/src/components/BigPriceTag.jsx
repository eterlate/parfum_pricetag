import React from 'react'

function BigPriceTag(props) {
    return (
        <>
            {props.item.percent != null ?
                <div className='priceTagBig'>
                    <h1 id='itemNameBig'>{props.item.itemName}</h1>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {props.item.percent > 10 ?
                            <>
                                <div style={{ width: '200px' }}>
                                    
                                    <h1 style={{marginBottom:'10px'}} id='itemPrice1Big'>{props.item.itemPrice}</h1>
                                    <h1 id='oldPriceHeaderBig'>старая цена</h1>
                                    <h1 id='oldPriceBig'>{props.item.itemPriceOld}</h1>
                                </div>
                                <div style={{ width: '200px' }}>
                                    <h1 id='percentBig'>-{props.item.percent}%</h1>
                                </div>
                            </>
                            :
                            <>
                                <div style={{ width: '200px' }}>
                                    <h1 id='oldPriceHeaderBig'>старая цена</h1>
                                    <h1 style={{marginBottom:'-4px'}} id='oldPriceBig'>{props.item.itemPriceOld}</h1>

                                </div>
                                <div style={{ width: '200px' }}>
                                    <h1 id='itemPrice1Big'>{props.item.itemPrice}</h1>
                                </div>
                            </>


                        }

                    </div>
                    <div className='priceTagBottomBig'>
                        <h1 id='docDateBig'>{props.item.docDate}</h1>
                        <h1 id='itemCodeBig'>{props.item.itemCode}</h1>
                    </div>
                </div>
                :
                <div className='priceTagBig'>

                    <h1 id='itemNameBig'>{props.item.itemName}</h1>
                    <h1 id='itemPriceBig'>{props.item.itemPrice}</h1>

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