import React from 'react'
import { useLocation } from 'react-router-dom'
import PriceTag from '../components/PriceTag'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function PrintPage() {
    const location = useLocation()
    const items = location.state
    let row = 0

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
                                <PriceTag key={el.itemCode + i} item={el}></PriceTag>
                            )
                            if (row == 42) {
                                mass.push(
                                    <div key={el.itemCode + i + 'pagebreak'} className='pagebreak'></div>
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

export default PrintPage