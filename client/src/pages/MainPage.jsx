import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { useCookies } from 'react-cookie';


const MainPage = () => {
    const { loading, error, request } = useHttp()

    const [cookies, setCookie, removeCookie] = useCookies(['searchData']);
    const [form, setForm] = useState({
        mag_number: '',
        doc_number: ''
    })
    const [mags, setMags] = useState([])
    const [items, setItems] = useState([])
    useEffect(() => {
        if ('searchData' in cookies) {
            setForm({
                mag_number: cookies.searchData.mag_number,
                doc_number: cookies.searchData.doc_number
            })
        }
    }, []);

    //handlers
    const clearHandler = () => {
        setForm({
            mag_number: '',
            doc_number: ''
        })
        removeCookie('searchData')
    }
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

    // query
    const docHandler = async () => {
        try {
            const data = await request('/find/mag', 'POST', { ...form })
            setMags(data.result.recordset)
            setCookie('searchData', form, { path: '/' })
        } catch (e) { }
    }
    const positionsHandler = async (e) => {
        try {
            const data = await request('/find/items', 'POST', { ...form })
            setItems(data.result.recordset)
            setCookie('searchData', form, { path: '/' })
        } catch (e) { }
    }

    return (
        <div className='main'>
            <div className='form'>
                <h1>Ценники</h1>
                <label htmlFor="mag_number">Номер магазина</label>
                <div>
                    <form id='chel'>
                        <input
                            type="text"
                            name='mag_number'
                            onChange={changeMagHandler}
                            value={form.mag_number}
                        />
                        <button className='searchButton' onClick={docHandler} disabled={loading}>Найти документы</button>
                    </form>
                </div>
                <label htmlFor="doc_number">Номер документа</label>
                <div>
                    <select value={form.doc_number} onChange={changeHandler} name="doc_number" id="doc_number">
                        <option value={form.doc_number}>{form.doc_number}</option>
                        {mags.map(el =>
                            <option key={el.docNumber} value={el.docNumber}>{el.docNumber}</option>
                        )}
                    </select>
                    <button className='searchButton' onClick={positionsHandler} disabled={loading}>Найти позиции</button>
                </div>

                <Link className='showButton' to='/print' state={items}>Показать ценники</Link>
                <button className='showButton' onClick={clearHandler}>Очистить поля</button>

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