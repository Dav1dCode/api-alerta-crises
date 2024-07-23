const express = require('express');
const router = express.Router();

module.exports = function(alertas) {

    router.get('/', (req, res) => {
        res.json(alertas);
    });

    router.get('/:id', (req, res) => {
        let alertaId = parseInt(req.params.id, 10);
        let alerta = alertas.find(a => a.id === alertaId);

        if (alerta) {
            res.json(alerta);
        } else {
            res.status(404).send('Alerta não encontrado');
        }
    });

    router.get('/tipo/:tipo', (req, res) => {
        let tipo = req.params.tipo.toLowerCase();
        let resultados = alertas.filter(a => a.tipo.toLowerCase() === tipo);
        res.json(resultados);
    });

    router.get('/data/:data', (req, res) => {
        let data = req.params.data;
        let resultados = alertas.filter(a => a.data === data);
        res.json(resultados);
    });

    router.get('/recente', (req, res) => {
        let recentes = alertas.sort((a, b) => new Date(b.data) - new Date(a.data));
        res.json(recentes);
    });

    router.get('/local/:local', (req, res) => {
        let local = req.params.local.toLowerCase();
        let resultados = alertas.filter(a => a.local.toLowerCase() === local);
        res.json(resultados);
    });

    router.get('/gravidade/:nivel', (req, res) => {
        let nivel = req.params.nivel.toLowerCase();
        let resultados = alertas.filter(a => a.gravidade.toLowerCase() === nivel);
        res.json(resultados);
    });

    router.get('/ativos', (req, res) => {
        let ativos = alertas.filter(a => a.ativo);
        res.json(ativos);
    });
s
    router.get('/inativos', (req, res) => {
        let inativos = alertas.filter(a => !a.ativo);
        res.json(inativos);
    });

    router.get('/historico/:periodo', (req, res) => {
        let periodo = req.params.periodo;
        let resultados = alertas.filter(a => a.data.startsWith(periodo));
        res.json(resultados);
    });

    router.post('/adicionar', (req, res) => {
        let novoAlerta = req.body;
        alertas.push(novoAlerta);
        res.status(201).json(novoAlerta);
    });

    router.put('/atualizar/:id', (req, res) => {
        let alertaId = parseInt(req.params.id, 10);
        let alertaIndex = alertas.findIndex(a => a.id === alertaId);

        if (alertaIndex !== -1) {
            let alertaAtualizado = { ...alertas[alertaIndex], ...req.body };
            alertas[alertaIndex] = alertaAtualizado;
            res.json(alertaAtualizado);
        } else {
            res.status(404).send('Alerta não encontrado');
        }
    });

    router.delete('/deletar/:id', (req, res) => {
        let alertaId = parseInt(req.params.id, 10);
        let alertaIndex = alertas.findIndex(a => a.id === alertaId);

        if (alertaIndex !== -1) {
            alertas.splice(alertaIndex, 1);
            res.status(204).send(); 
        } else {
            res.status(404).send('Alerta não encontrado');
        }
    });

    return router;
};


