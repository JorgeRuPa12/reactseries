import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default class Personajes extends Component {

    state = {
        personajes: []
    }

    loadPersonajes = () => {
        let request = "api/Series/PersonajesSerie/" + this.props.id
        let url = Global.urlSeries + request
        axios.get(url).then(response => {
            this.setState({
                personajes: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadPersonajes()
    }

    render() {
        return (
        <div>
            <h1>Personajes de {this.props.id}</h1>
            <hr className='border border-primary'/>
            <NavLink className="btn btn-outline-danger w-100" to={"/detalle/"+this.props.id}>Volver a Serie</NavLink>
            <hr className='border border-primary'/>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>Personaje</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.personajes.map((personaje, index) => {
                            return(
                                <tr key={index}>
                                    <td>{personaje.nombre}</td>
                                    <td><img src={personaje.imagen} width="128" alt='Imagen Personaje'/></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        )
    }
}
