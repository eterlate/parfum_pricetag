import React from 'react'
import { useLocation } from 'react-router-dom'
import BigPriceTag from '../components/BigPriceTag'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function PrintBigPage() {
    const location = useLocation()
    let row = 0
    const items = location.state
    const navigate = useNavigate();
    
    return (
        <div className='tagContainer'>
            <div className='printPageButtons'>
                <a href="javascript:(print());">Печать</a>
                <button onClick={() => navigate(-1)}>Назад</button>
            </div>
            <div className='rowTags'>
                {items.map(el => {
                    let mass = []
                    for (let i = 0; i < el.count; i++) {
                        row += 1
                        mass.push(
                            <BigPriceTag key={el.itemCode + i} item={el}></BigPriceTag>
                        )
                        if (row == 14) {
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

export default PrintBigPage