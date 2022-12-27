import React from 'react'
import { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import moment from 'moment';
import TagStr from '../components/TagStr';
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie';

const FindPage = () => {
    const { loading, error, request } = useHttp()
    const [items, setItems] = useState([])

    const [cookies, setCookie, removeCookie] = useCookies(['searchBarData']);

    const [form, setForm] = useState({
        barcode: '',
        mag: '',
        curr_date: '',
        prev_date: ''
    })

    useEffect(() => {
        if ('searchBarData' in cookies) {
            let now = moment().format('YYYY-MM-DD') + "T00:00:00.000Z"
            let minusNow = moment().subtract(5, 'd').format('YYYY-MM-DD') + "T00:00:00.000Z"
            setForm({
                barcode: cookies.searchBarData.barcode,
                mag: cookies.searchBarData.mag,
                curr_date: now,
                prev_date: minusNow
            })
            const refreshHandler = async () => {
                try {
                    let formData = {
                        barcode: cookies.searchBarData.barcode,
                        mag: cookies.searchBarData.mag,
                        curr_date: now,
                        prev_date: minusNow
                    }
                    request('/find/barcode', 'POST', { ...formData }).then(data => {
                        if (typeof (data) == 'string') {
                            alert(data)
                            return
                        }
                        data.count = 1
                        let index = items.findIndex(el => el.itemCode == data.itemCode)
                        if (index != -1) {
                            increment(data.itemCode, items[index].count + 1)
                        } else {
                            setItems([...items, data])
                        }
                    })
                } catch (e) { }
            }
            refreshHandler()
        }
    }, []);

    const changeFormHandler = (e) => {
        let now = moment().format('YYYY-MM-DD') + "T00:00:00.000Z"
        let minusNow = moment().subtract(5, 'd').format('YYYY-MM-DD') + "T00:00:00.000Z"

        setForm({ ...form, [e.target.name]: e.target.value, curr_date: now, prev_date: minusNow })
    }


    const submitHandler = async (e) => {
        e.preventDefault()
        // 3600542232012
        if (form.barcode && form.mag != 0) {
            request('/find/barcode', 'POST', { ...form }).then(data => {
                if (typeof (data) == 'string') {
                    alert(data)
                    return
                }
                data.count = 1
                let index = items.findIndex(el => el.itemCode == data.itemCode)
                if (index != -1) {
                    increment(data.itemCode, items[index].count + 1)
                } else {
                    setItems([...items, data])
                }
            })
            setCookie('searchBarData', form, { path: '/' })
        }
        else {
            alert('Заполните поля')
        }

    }

    const clearHandler = () => {
        setItems([])
        setForm({
            barcode: '',
            mag: '',
            curr_date: '',
            prev_date: ''
        })
        removeCookie('searchBarData')
    }

    const increment = (itemCode, count) => {
        setItems(prev => {
            let newData = [...prev]
            const index = newData.findIndex(el => el.itemCode === itemCode)
            if (count < 0) {
                return prev
            }
            newData[index].count = count
            return newData
        })
    }

    return (
        <>
            {loading ?
                <div className='dark'>
                    <div className="lds-ripple"><div></div><div></div></div>
                </div>
                :
                <div></div>
            }
            <div className='main'>
                <form className='form_find' onSubmit={submitHandler}>
                    <h1>Поиск по штрих-коду</h1>
                    <label htmlFor="mag">Номер магазина</label>
                    <input
                        type="text"
                        name='mag'
                        onChange={changeFormHandler}
                        value={form.mag}
                        placeholder='Введите номер магазина'
                    />

                    <label htmlFor="barcode">Штрих-код</label>
                    <input
                        type="text"
                        name='barcode'
                        onChange={changeFormHandler}
                        value={form.barcode}
                        placeholder='Введите штрих-код'
                    />

                    <button className='searchButton' type='submit' disabled={loading}>Добавить</button>

                    <div style={{ display: 'flex', flexDirection: 'row', marginTop:'20px' }}>
                        {items.length == 0 ?
                            <>
                                <Link style={{ marginRight: '10px' }} className='showButtonDisabled' to='/find'>Маленькие ценники</Link>
                                <Link style={{ marginRight: '10px' }} className='showButtonDisabled' to='/find'>Средние ценники</Link>
                                <Link className='showButtonDisabled' to='/find'>Большие ценники</Link>

                            </>
                            :
                            <>
                                <Link style={{ marginRight: '10px' }} className='showButton' to='/print' state={items}>Маленькие ценники</Link>
                                <Link style={{ marginRight: '10px' }} className='showButton' to='/print_medium' state={items}>Средние ценники</Link>
                                <Link className='showButton' to='/print_big' state={items}>Большие ценники</Link>
                            </>
                        }

                    </div>

                    
                    <button type='button' className='searchButton' onClick={clearHandler}>Очистить поля</button>

                </form>


                {items.length != 0 ?
                    <>
                        <table id='items'>
                            <tbody>
                                <tr>
                                    <th>Штрих-код</th>
                                    <th>Цвет</th>
                                    <th>Название</th>
                                    <th>В наличии</th>
                                    <th>Цена</th>
                                    <th>Количество</th>
                                </tr>
                                {items.map(el =>
                                    <TagStr item={el} increment={increment} />
                                )}
                            </tbody>
                        </table>
                    </>
                    :
                    <></>
                }
            </div>
        </>
    )
}

export default FindPage