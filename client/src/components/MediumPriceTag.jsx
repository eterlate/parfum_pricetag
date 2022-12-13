import React from 'react'

function MediumPriceTag(props) {
    return (
        <>
            {props.item.percent != null ?
                <div className='priceTagMedium'>
                    <h1 id='itemNameMedium'>{props.item.itemName}</h1>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        {props.item.percent > 10 ?
                            <>
                                <div style={{ width: '111px' }}>
                                    <h1 style={{ marginBottom: '9px' }} id='itemPrice1Medium'>{props.item.itemPrice}</h1>

                                </div>
                                <div style={{ width: '111px' }}>
                                    <h1 id='percentMedium'>-{props.item.percent}%</h1>
                                    <h1 id='oldPriceMedium'>{props.item.itemPriceOld}</h1>
                                </div>
                            </>
                            :
                            <>
                                <div style={{ width: '111px' }}>
                                    <h1 id='itemPriceMin10Medium'>{props.item.itemPrice}</h1>


                                </div>
                                <div style={{ width: '111px' }}>
                                    <h1 style={{ marginBottom: '-4px' }} id='oldPriceMedium'>{props.item.itemPriceOld}</h1>
                                </div>
                            </>
                        }
                    </div>
                    <div className='priceTagBottomMedium'>
                        <h1 id='docDateMedium'>{props.item.docDate}</h1>
                        <h1 id='itemCodeMedium'>{props.item.itemCode}</h1>
                    </div>
                </div>
                :
                <div className='priceTagMedium'>

                    <h1 id='itemNameMedium'>{props.item.itemName}</h1>
                    <h1 id='itemPriceMedium'>{props.item.itemPrice}</h1>

                    <div className='priceTagBottomMedium'>
                        <h1 id='docDateMedium'>{props.item.docDate}</h1>
                        <h1 id='itemCodeMedium'>{props.item.itemCode}</h1>
                    </div>
                </div>
            }
        </>
    )
}

export default MediumPriceTag