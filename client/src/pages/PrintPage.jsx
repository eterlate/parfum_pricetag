import React from 'react'
import { useContext } from 'react'
import { PrintContext } from '../context/PrintContext'
import PrintPageItem from './PrintPageItem'
import { useLocation } from 'react-router-dom'

function PrintPage () {
    const location = useLocation()
    
    let items = location.state
    return(
        <div>
            <ul>
                {items.map(el =>
                    <li key={el.itemName}>{el.itemName}</li>
                )}
            </ul>
            <a href="javascript:(print());">Печать</a>
        </div>
    )
}

export default PrintPage