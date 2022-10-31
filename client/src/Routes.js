import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import MainPage from './pages/MainPage'
import PrintPage from './pages/PrintPage'

export const userRoutes = () =>{
        return(
            <Routes>
                <Route path='/' element={<MainPage/>} />
                <Route path='/print' element={<PrintPage/>} />

                <Route path='*' element={<Navigate replace to ='/'/>} />
            </Routes>
        )
}