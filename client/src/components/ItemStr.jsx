import React from 'react'

function ItemStr(props) {
    
    return (

        <tr>
            <td>{props.item.ПодКатегория}</td>
            <td>{props.item.itemCode}</td>
            <td>{props.item.itemName}</td>
            <td>
                <button className='plusminusButton' onClick={()=>props.increment(props.item.itemCode, props.item.count - 1)}>-</button>
                {props.item.count}
                <button className='plusminusButton' onClick={()=>props.increment(props.item.itemCode, props.item.count + 1)}>+</button>
            </td>
        </tr>

    )
}

export default ItemStr