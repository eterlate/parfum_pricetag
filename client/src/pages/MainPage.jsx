import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'


const MainPage = () => {
    const { loading, error, request } = useHttp()

    const [form, setForm] = useState({
        mag_number: '',
        doc_number: ''
    })
    const [mags, setMags] = useState([])
    const [items, setItems] = useState([])


    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const changeMagHandler = event => {
        setForm({
            mag_number: event.target.value,
            doc_number: ''
        })
        setMags([])
        setItems([])
    }


    useEffect(() => {

    }, [error])

    const docHandler = async () => {
        try {
            const data = await request('/find/mag', 'POST', { ...form })
            setMags(data.result.recordset)
        } catch (e) { }
    }

    const positionsHandler = async () => {
        try {
            const data = await request('/find/items', 'POST', { ...form })
            setItems(data.result.recordset)
        } catch (e) { }
    }

    return (
        <div className='main'>
            <div className='form'>
                <h1>Ценники</h1>
                <label htmlFor="mag_number">Номер магазина</label>
                <div>
                    <input
                        type="text"
                        name='mag_number'
                        onChange={changeMagHandler}
                    />
                    <button className='searchButton' onClick={docHandler} disabled={loading}>Найти документы</button>
                </div>
                <label htmlFor="doc_number">Номер документа</label>
                <div>
                    <select onChange={changeHandler} name="doc_number" id="doc_number">
                        {mags.map(el =>
                            <option key={el.docNumber} value={el.docNumber}>{el.docNumber}</option>
                        )}
                    </select>
                    <button className='searchButton' onClick={positionsHandler} disabled={loading}>Найти позиции</button>
                </div>

                <Link className='showButton' to='/print' state={items}>Показать ценники</Link>
            </div>
            {items.length > 0 ?
                <div className='list'>
                    <ul>
                        {items.map(el =>
                            <li key={el.itemName}>{el.itemName}</li>
                        )}
                    </ul>
                </div>
                :
                <div className='list'>
                    <ul>
                        {mags.map(el =>
                            <li key={el.docNumber}>{el.docNumber}</li>
                        )}
                    </ul>
                </div>
            }

        </div>
    )
}

export default MainPage