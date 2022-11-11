import React from 'react'
import { useLocation } from 'react-router-dom'
import PriceTag from '../components/PriceTag'
import { Link } from 'react-router-dom' 

function PrintPage () {
    const location = useLocation()
    let i = 0
    const items = location.state
    return(


        <div className='tagContainer'>
            <a style={{margin:'0 250px', color:'black', textDecoration:'none'}} href="javascript:(print());">Печать</a>
            <Link style={{color:'black', textDecoration:'none'}} to='/'>Назад</Link>
            <div className='rowTags'>
            {items.map(el => {
                i+=1
                if(i == 42){
                    i = 0
                    return(
                        <div>
                            <PriceTag item={el}></PriceTag>
                            <div className='pagebreak'></div>
                        </div>
                    )
                }

                else{
                    return(
                        <PriceTag item={el}></PriceTag>
                    )
                }

                }
            )}
            </div>
        </div>
    )
}

export default PrintPage