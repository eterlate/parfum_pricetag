import React from 'react'

function MagStr(props) {
    
    return (

        <tr>
            <td>{props.mag.docNumber}</td>
            <td>{props.mag.headers.header}</td>
        </tr>

    )
}

export default MagStr