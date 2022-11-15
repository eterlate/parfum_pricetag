import React from 'react'

function MagStr(props) {
    
    return (

        <tr onClick={()=>props.showItems(props.mag.docNumber, props.mag.shopCode)}>
            <td>{props.mag.docNumber}</td>
            <td>{props.mag.headers.header}</td>
        </tr>

    )
}

export default MagStr