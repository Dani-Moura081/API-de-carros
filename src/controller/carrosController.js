import * as db from "../repository/carrosRepository.js";
import multer from 'multer'

import { Router } from 'express'
const endpoints = Router()

endpoints.get('/carros', async (req, resp) => {
    try {
        let registros = await db.consultarCarro()
        resp.send(registros)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


let upload = multer({ dest: './storage/imgCarros'})
endpoints.put('/carros/:id/imagem', upload.single('carro'),  async (req, resp) => {
 let {id} = req.params.id;
 let caminho = req.file.path;
 let originalname = req.file.originalname;
 let extension = req.file.originalname.split('.').pop();

 try {
  let update = await db.inserirImagem(caminho, id);
  resp.send({
    update: update,
    caminho: caminho,
    originalName: originalname,
    extensao: extension
  })
 } catch (error) {
    logErro(error)
    resp.status(400).send(criarErro(error));
 }
})


endpoints.delete('/carros/:id/imagem', async (req, resp) => {

    let id = req.params.id;
    try {
      let alterar = await db.deletarImagem(id);
      if (alterar >= 1) {
        resp.status(200).send({
          alterar: alterar,
        });
      } else {
        resp.status(404).send({
          error: "Não foi possivel encontrar o registro",
        });
      }
    } catch (error) {
      logErro(error);
      resp.status(400).send(criarErro(error));
    }
  })
  

endpoints.post('/carros', async (req, resp) => {
    try {
        let carro = req.body;
        let registros = await db.inserirCarro(carro)

        resp.send({
            novoId: Id
        })


    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }


})


endpoints.put('/carros/:id', async (req, resp) => {
    try {
        let id = req.body.id;
        let carro = req.body;
        let linhasAfetadas = await db.alterarCarro(id, carro)
        if (linhasAfetadas >= 1) {
            resp.send()
        } else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado' })
        }

    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }


})



endpoints.delete('/carros/:id', async (req, resp) => {
    try {
        let id = req.body.id;
        let linhasAfetadas = await db.removerCarro(id,)
        if (linhasAfetadas >= 1) {
            resp.send()
        } else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado' })
        }

    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }


})


endpoints.post('/carros/imagem', upload.single('carro'), async (req, resp) => {
    const carros = req.body;
    const caminho = req.file.path
    try {
      let id = await db.inserirCarroEimagem(carros, caminho);
      resp.send({
        id: id,
        caminho: caminho
      });
    } catch (error) {
      logErro(error);
      resp.status(400).send(criarErro(error));
    }
  })
  

export default endpoints