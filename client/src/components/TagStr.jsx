import React from 'react'

function TagStr({item, increment}) {

    return (

        <tr>
            <td>{item.itemCode}</td>
            <td>{item.tag_color_new}</td>
            <td>{item.itemName}</td>
            <td>{item.stock}</td>
            <td>{item.itemPrice}</td>
            <td>
                <button className='plusminusButton' onClick={() => increment(item.itemCode, item.count - 1)}>-</button>
                {item.count}
                <button className='plusminusButton' onClick={() => increment(item.itemCode, item.count + 1)}>+</button>
            </td>
        </tr>

    )
}

export default TagStr