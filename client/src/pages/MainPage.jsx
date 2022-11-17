import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { useCookies } from 'react-cookie';
import ItemStr from '../components/ItemStr';
import MagStr from '../components/MagStr';
import { useNavigate } from 'react-router-dom'


const MainPage = () => {
    const { loading, error, request } = useHttp()

    const [cookies, setCookie, removeCookie] = useCookies(['searchData']);

    const [form, setForm] = useState({
        mag_number: '',
        doc_number: ''
    })
    const [headers, setHeaders] = useState({
        header: '',
        color: ''
    })
    const [mags, setMags] = useState([])
    const [items, setItems] = useState([])



    useEffect(() => {
        if ('searchData' in cookies) {
            setForm({
                mag_number: cookies.searchData.mag_number,
                doc_number: ''
            })
            const refreshHandler = async () => {
                try {
                    const data = await request('/find/mag', 'POST', { mag_number: cookies.searchData.mag_number })
                    setMags(data.result.recordset)
                } catch (e) { }
            }
            refreshHandler()
        }

    }, []);

    useEffect(() => {
        positionsHandler()
    }, [form])

    //handlers
    const clearHandler = () => {
        setForm({
            mag_number: '',
            doc_number: ''
        })
        setHeaders({
            header: '',
            color: ''
        })
        setMags([])
        setItems([])
        removeCookie('searchData')
    }

    const changeMagHandler = event => {
        setForm({
            mag_number: event.target.value,
            doc_number: ''
        })
        setMags([])
        setItems([])
        setHeaders({
            header: '',
            color: ''
        })
    }

    // query
    const docHandler = async (e) => {
        try {
            setItems([])
            setHeaders({
                header: '',
                color: ''
            })
            e.preventDefault()
            if (form.mag_number == '') {
                return
            }
            const data = await request('/find/mag', 'POST', { ...form })
            setMags(data.result.recordset)
            setCookie('searchData', form, { path: '/' })
        } catch (e) { }
    }
    const positionsHandler = async () => {
        try {
            if (form.doc_number == '' || form.mag_number == '') {
                return
            }
            const data = await request('/find/items', 'POST', { ...form })
            if (data.headers != undefined) {
                setHeaders({
                    header: data.headers.header,
                    color: data.headers.color
                })
            } else {
                setHeaders({
                    header: '',
                    color: ''
                })
            }
            setItems(data.result.recordset.map(el => { return { ...el, count: 1 } }
            ))

            setCookie('searchData', form, { path: '/' })
        } catch (e) { }
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

    const showItems = (doc_number, mag_number) => {
        setForm({
            mag_number,
            doc_number
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
                <form className='form' onSubmit={docHandler}>
                    <h1>Ценники</h1>
                    <label htmlFor="mag_number">Номер магазина</label>
                    <div>
                        <input
                            type="text"
                            name='mag_number'
                            onChange={changeMagHandler}
                            value={form.mag_number}
                            style={{ marginRight: '10px' }}
                        />
                        <button className='searchButton' type='submit' disabled={loading}>Найти документы</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        {items.length == 0 ?
                            <>
                                <Link style={{ marginRight: '10px' }} className='showButtonDisabled' to='/'>Маленькие ценники</Link>
                                <Link className='showButtonDisabled' to='/'>Большие ценники</Link>
                            </>
                            :
                            <>
                                <Link style={{ marginRight: '10px' }} className='showButton' to='/print' state={items}>Маленькие ценники</Link>
                                <Link className='showButton' to='/print_big' state={items}>Большие ценники</Link>
                            </>
                        }

                    </div>
                    <button className='searchButton' onClick={clearHandler}>Очистить поля</button>
                </form>


                {headers.header != ''
                    ?
                    <div className='headerBack'><h1 className='tableHeader' style={headers}>{headers.header}</h1></div>
                    :
                    <div></div>
                }
                {items.length > 0 ?
                    <>
                        <h2 className='tableHeader'>Выбранный документ - {form.doc_number}</h2>
                        
                            <table id='items'>
                                <tbody>
                                    <tr>
                                        <th>Подкатегория</th>
                                        <th>Штрих-код</th>
                                        <th>Название</th>
                                        <th>Количество</th>
                                    </tr>
                                    {items.map(el =>
                                        <ItemStr key={el.itemCode} item={el} increment={increment}></ItemStr>
                                    )}
                                </tbody>
                            </table>
                    </>
                    :
                    mags.length > 0 ?

                            <table id='items'>
                                <tbody>
                                    <tr>
                                        <th>Документ</th>
                                        <th>Ценник</th>
                                    </tr>
                                    {mags.map(el =>

                                        <MagStr key={el.shopCode + el.docNumber} mag={el} showItems={showItems}></MagStr>

                                    )}
                                </tbody>
                            </table>
                        :
                        <div></div>
                }

            </div>
        </>
    )
}

export default MainPage