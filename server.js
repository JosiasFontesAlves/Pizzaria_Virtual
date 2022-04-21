import express from 'express';
import { writeFile } from 'fs';

const app = express();

app.listen(7000, () => console.log('Servidor rodando na porta 7000'));

app.use(express.static('src'));
app.use(express.json());

app.post('/api', (req, res) => {
    writeFile('./src/api.json', JSON.stringify(req.body, null, 4), err => {
        if (err) throw err;
    });

    res.end();
});