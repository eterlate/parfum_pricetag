import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import MainPage from './pages/MainPage'
import PrintPage from './pages/PrintPage'
import PrintBigPage from './pages/PrintBigPage'
import PrintMediumPage from './pages/PrintMediumPage'

export const userRoutes = () =>{
        return(
            <Routes>
                <Route path='/' element={<MainPage/>} />
                <Route path='/print' element={<PrintPage/>} />
                <Route path='/print_big' element={<PrintBigPage/>} />
                <Route path='/print_medium' element={<PrintMediumPage/>} />

                <Route path='*' element={<Navigate replace to ='/'/>} />
            </Routes>
        )
}