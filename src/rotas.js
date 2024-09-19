import carrosController from './controller/carrosController.js'
import express from 'express'
export default function adicionarRotas(servidor) {
    servidor.use(carrosController)
    servidor.use('./src/storage/imgCarros', express.static('./src/storage/imgCarros'))

}
