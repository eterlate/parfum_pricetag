import React from 'react'
import { useLocation } from 'react-router-dom'
import BigPriceTag from '../components/BigPriceTag'
import { Link } from 'react-router-dom'

function PrintBigPage() {
    const location = useLocation()
    let i = 0
    const items = location.state
    return (
        <div className='tagContainer'>
            <a style={{ margin: '0 250px', color: 'black', textDecoration: 'none' }} href="javascript:(print());">Печать</a>
            <Link style={{ color: 'black', textDecoration: 'none' }} to='/'>Назад</Link>
            <div className='rowTags'>
                {items.map(el => {
                    i += 1
                    if (i == 42) {
                        i = 0
                        return (
                            <div>
                                <BigPriceTag item={el}></BigPriceTag>
                                <div className='pagebreak'></div>
                            </div>
                        )
                    }
                    else {
                        return (
                            <BigPriceTag item={el}></BigPriceTag>
                        )
                    }
                }
                )}
            </div>
        </div>
    )
}

export default PrintBigPage