import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default class DetalleSerie extends Component {

    state ={
        serie: []
    }

    buscarSerie = () => {
        let request = "api/Series/" + this.props.id
        let url = Global.urlSeries + request
        axios.get(url).then(response => {
            this.setState({
                serie: response.data
            })
        })
    }

    componentDidMount = () => {
        this.buscarSerie()
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.id !== prevProps.id){
            this.buscarSerie()
        }
    }

    render() {
        return (
        <div>
            <div className="card m-3 ms-2" style={{width: "18rem"}}>
            <img src={this.state.serie.imagen} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{this.state.serie.nombre}</h5>
                <p className="card-text">IMDB: {this.state.serie.puntuacion}</p>
                <NavLink to={"/personajes/" + this.state.serie.idSerie} className="btn btn-primary">Personajes</NavLink>
            </div>
            </div>
        </div>
        )
    }
}
