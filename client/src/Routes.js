import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import MainPage from './pages/MainPage'
import PrintPage from './pages/PrintPage'
import PrintBigPage from './pages/PrintBigPage'
import PrintMediumPage from './pages/PrintMediumPage'
import FindPage from './pages/FindPage'

export const userRoutes = () =>{
        return(
            <Routes>
                <Route path='/' element={<MainPage/>} />
                <Route path='/find' element={<FindPage/>} />
                <Route path='/print' element={<PrintPage/>} />
                <Route path='/print_big' element={<PrintBigPage/>} />
                <Route path='/print_medium' element={<PrintMediumPage/>} />

                <Route path='*' element={<Navigate replace to ='/'/>} />
            </Routes>
        )
}