import React from 'react'
import { useLocation } from 'react-router-dom'
import PriceTag from '../components/PriceTag'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

function PrintPage() {
    const location = useLocation()
    const items = location.state
    let i = 0




    return (


        <div className='tagContainer'>
            <a style={{ margin: '0 250px', color: 'black', textDecoration: 'none' }} href="javascript:(print());">Печать</a>
            <Link style={{ color: 'black', textDecoration: 'none' }} to='/'>Назад</Link>
            <div className='rowTags'>
                {items.map(el => {
                    i += 1

                    let count = el.count
                        if (count == 1) {
                            return (
                                <PriceTag item={el}></PriceTag>
                            )
                        } else {
                            let mass = []
                            for (let i = 0; i < count; i++) {
                                mass.push(
                                    <PriceTag item={el} count={i}></PriceTag>
                                )
                            }
                            return [mass]
                        }
                        
                        
                    
                }
                )}

            </div>
        </div>
    )
}

export default PrintPage