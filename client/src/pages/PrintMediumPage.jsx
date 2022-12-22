import React from 'react'
import { useLocation } from 'react-router-dom'
import MediumPriceTag from '../components/MediumPriceTag'
import { Link } from 'react-router-dom'

function PrintMediumPage() {
    const location = useLocation()
    let row = 0
    const items = location.state

    
    return (
        <div className='tagContainer'>
            <a style={{ margin: '0 250px', color: 'black', textDecoration: 'none' }} href="javascript:(print());">Печать</a>
            <Link style={{ color: 'black', textDecoration: 'none' }} to='/'>Назад</Link>
            <div className='rowTags'>
                {items.map(el => {
                    let mass = []
                    for (let i = 0; i < el.count; i++) {
                        row += 1
                        mass.push(
                            <MediumPriceTag key={el.itemCode + i} item={el}></MediumPriceTag>
                        )
                        if (row == 28) {
                            mass.push(
                                <div key={el.itemCode + i + 'pagebreak'} className='pagebreakMedium'></div>
                            )
                            row = 0
                        }
                    }
                    return [...mass]
                }
                )}
            </div>
        </div>
    )
}

export default PrintMediumPage