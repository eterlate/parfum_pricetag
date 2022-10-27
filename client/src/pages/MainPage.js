import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'

const MainPage = () => {
    const {loading, error, request} = useHttp()
    const [form, setForm] = useState({
        mag_number: ''
    })
    const changeHandler = event =>{
        setForm({...form, [event.target.name]: event.target.value})
    }

    const magHandler = async () => {
        try{
            const data = await request('/find/mag', 'POST', {...form})
            console.log('data:', data)
        }catch(e){}
    }

    return (
        <div>
            <h1>MainPage</h1>
            <form>
                <label htmlFor="mag_number">Номер магазина</label>
                <input
                type="text"
                name='mag_number' 
                onChange={changeHandler}
                placeholder='Введите номер магазина'
                />
                <button onClick={magHandler} disabled={loading}>Найти</button>
            </form>
            
        </div>
    )
}

export default MainPage