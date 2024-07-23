const express = require('express');
const router = express.Router();

module.exports = (alertas) => {
    router.get('/', (req, res) => {
        res.json(alertas);
    });

    router.get('/:id', (req, res) => {
        const alerta = alertas.find(a => a.id == req.params.id);
        if (alerta) {
            res.json(alerta);
        } else {
            res.status(404).send('Alerta não encontrado');
        }
    });

    router.post('/', (req, res) => {
        const novoAlerta = {
            id: alertas.length + 1,
            ...req.body
        };
        alertas.push(novoAlerta);
        res.status(201).json(novoAlerta);
    });

    router.put('/:id', (req, res) => {
        const alerta = alertas.find(a => a.id == req.params.id);
        if (alerta) {
            Object.assign(alerta, req.body);
            res.json(alerta);
        } else {
            res.status(404).send('Alerta não encontrado');
        }
    });

    router.delete('/:id', (req, res) => {
        const index = alertas.findIndex(a => a.id == req.params.id);
        if (index !== -1) {
            alertas.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).send('Alerta não encontrado');
        }
    });

    return router;
};