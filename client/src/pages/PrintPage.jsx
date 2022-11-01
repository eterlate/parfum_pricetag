import React from 'react'
import { useLocation } from 'react-router-dom'
import PriceTag from './PriceTag'

function PrintPage () {
    const location = useLocation()
    
    const items = location.state
    return(
        <div className='tagContainer'>
            <div className='rowTags'>
            {items.map(el =>
                <PriceTag item={el}></PriceTag>
            )}
            </div>

            
            <a href="javascript:(print());">Печать</a>
        </div>
    )
}

export default PrintPage