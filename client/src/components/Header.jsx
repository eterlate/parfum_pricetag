import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
    return (
            <header>
                <div className='nav_block'>
                    <h1 style={{fontSize:'30px'}} className='navlink'>PrintPrice</h1>
                </div>
                <div className='nav_block'>
                    <Link className='navlink' to='/'>Поиск по магазину</Link>
                    <Link className='navlink' to='/find'>Поиск по штрих-коду</Link>
                </div>
                <div className='nav_block'>
                    <a className='navlink' href="https://t.me/shkinev">Обратная связь</a>
                </div>

            </header>
    )
}

export default Header