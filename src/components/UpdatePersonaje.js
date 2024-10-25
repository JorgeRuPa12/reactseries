import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

export default class UpdatePersonaje extends Component {
    selectSerie = React.createRef()
    selectPersonaje = React.createRef()

    state = {
        series: [],
        personajes: [],
        serie: [],
        personaje: [],
        status: false
    }

    laodSeries = () => {
        let request = "api/Series"
        let url = Global.urlSeries + request
        axios.get(url).then(response => {
            this.setState({
                series: response.data
            })
        })
    }

    laodPersonajes = () => {
        let request = "api/Personajes"
        let url = Global.urlSeries + request
        axios.get(url).then(response => {
            this.setState({
                personajes: response.data
            })
        })
    }

    mostrarSerie = (e) => {
        e.preventDefault()
        let request = "api/Series/" + this.selectSerie.current.value
        let url = Global.urlSeries + request
        axios.get(url).then(response => {
            this.setState({
                serie: response.data
            })
        })
    }

    mostrarPersonaje = (e) => {
        e.preventDefault()
        let request = "api/Personajes/" + this.selectPersonaje.current.value
        let url = Global.urlSeries + request
        axios.get(url).then(response => {
            this.setState({
                personaje: response.data
            })
        })
    }

    modificarPersonaje = (e) => {
        e.preventDefault()
        let idPersonaje = this.selectPersonaje.current.value
        let idSerie = this.selectSerie.current.value

        let request = "api/Personajes/" + idPersonaje + "/" + idSerie
        let url = Global.urlSeries + request

        axios.put(url).then(response => {
            this.setState({
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.laodSeries()
        this.laodPersonajes()
    }
 
    render() {
        return (
        <div className='container mt-2'>
            <h1>Modificar Personaje</h1>
            <hr className='border border-primary'/>
            <form>
                <label>Serie</label>
                <select className='form-control mb-2' ref={this.selectSerie} onChange={this.mostrarSerie}>
                    {
                        this.state.series.map((serie, index) => {
                            return(
                                <option key={index} value={serie.idSerie}>{serie.nombre}</option>
                            )
                        })
                    }
                </select>
                <label>Personaje</label>
                <select className='form-control' ref={this.selectPersonaje} onChange={this.mostrarPersonaje}>
                    {
                        this.state.personajes.map((personaje, index) => {
                            return(
                                <option key={index} value={personaje.idPersonaje}>{personaje.nombre}</option>
                            )
                        })
                    }
                </select>
                <button className='btn btn-outline-success w-100 mt-2 mb-2' onClick={this.modificarPersonaje}>
                    Modificar
                </button>
            </form>
            <div className='row'>
                <div className='col-6'>
                    {
                        this.state.serie.length !== 0 &&
                        (
                            <div>
                                <h2>{this.state.serie.nombre}</h2>
                                <hr className='border border-primary' />
                                <img src={this.state.serie.imagen} className='w-100' alt='Imagen Serie'/> 
                            </div> 
                        )
                    }
                </div>
                <div className='col-6'>
                    {
                        this.state.personaje.length !== 0 &&
                        (
                            <div>
                                <h2>{this.state.personaje.nombre}</h2>
                                <hr className='border border-primary' />
                                <img src={this.state.personaje.imagen} className='w-100' alt='Imagen Personaje'/> 
                            </div> 
                        )
                    }
                </div>
                
            </div>
            {
                this.state.status &&
                (<Navigate to="/"/>)
            }
        </div>
        )
    }
}
