const express = require('express');
const app = express();
const port = 3000;

const alertasRoutes = require('./routes/alertas');

app.use(express.json());

app.use('/alertas', alertasRoutes);

app.get('/', (req, res) => {
    res.send('Bem-vindo ao sistema de alerta de crises de Belo Horizonte');
});

app.listen(port, () => {
    console.log(`API de alertas de crises rodando em http://localhost:${port}`);
});
