import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams} from 'react-router-dom'
import Menu from './Menu'
import Home from './Home'
import DetalleSerie from './DetalleSerie'
import Personajes from './Personajes'
import CreatePersonaje from './CreatePersonaje'
import UpdatePersonaje from './UpdatePersonaje'

export default class Router extends Component {
    render() {
        function DetalleSerieElement() { 
            var {id} = useParams()

            return(<DetalleSerie id={id}/>)
         }

         function PersonajesElement() { 
            var {id} = useParams()

            return(<Personajes id={id}/>)
         }
        return (
            <BrowserRouter>
                <Menu/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/create' element={<CreatePersonaje/>}/>
                    <Route path='/modificar' element={<UpdatePersonaje/>}/>
                    <Route path='/detalle/:id' element={<DetalleSerieElement/>}/>
                    <Route path='/personajes/:id' element={<PersonajesElement/>}/>
                </Routes>
            </BrowserRouter>
        )
    }
}
