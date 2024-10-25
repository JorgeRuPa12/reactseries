import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

export default class CreatePersonaje extends Component {
    cajanombre = React.createRef()
    cajaimagen = React.createRef()
    selectserie = React.createRef()

    state = {
        series: [],
        status: false
    }

    loadSeries = () => {
        let request = "api/Series"
        let url = Global.urlSeries + request
        axios.get(url).then(response => {
            this.setState({
                series: response.data
            })
        })
    }

    crearPersonaje = (e) => {
        e.preventDefault()
        let request = "api/Personajes"
        let url = Global.urlSeries + request
        let personaje = {
            idPersonaje: 26,
            nombre: this.cajanombre.current.value,
            imagen: this.cajaimagen.current.value,
            idSerie: parseInt(this.selectserie.current.value)
        }
        axios.post(url, personaje).then(response => {
            this.setState({
                status: true
            })
        })
    }

    componentDidMount = () => {
        this.loadSeries()
    }


    render() {
        return (
        <div className='container mt-3'>
            <h1>Crear Personaje</h1>
            <hr className='border border-primary' />
            <form>
                <label>Nombre</label>
                <input type='text' className='form-control' ref={this.cajanombre}/>
                <label>Imagen</label>
                <input type='text' className='form-control' ref={this.cajaimagen}/>
                <label>Serie</label>
                <select className='form-control' ref={this.selectserie}>
                    {
                        this.state.series.map((serie, index) => {
                            return(<option key={index} value={serie.idSerie}>{serie.nombre}</option>)
                        })
                    }
                </select>
                <button className='btn btn-outline-success mt-2' onClick={this.crearPersonaje}>Crear</button>
            </form>
            {
                this.state.status &&
                (<Navigate to="/"/>)
            }
        </div>
        )
    }
}
