const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas do jogo
app.get('/', (req, res) => {
  res.json({ 
    message: '🎮 Gire e Ganhe ONLINE!',
    status: 'operacional',
    version: '1.0'
  });
});

app.post('/api/girar', (req, res) => {
  const premios = [0, 10, 20, 50, 100, 500];
  const premio = premios[Math.floor(Math.random() * premios.length)];
  
  res.json({
    success: true,
    premio: premio,
    message: premio > 0 ? `🎉 Ganhaste ${premio} MT!` : '😢 Tente novamente!'
  });
});

// Comprar giros
app.post('/api/comprar-giros', (req, res) => {
  const { pacote } = req.body;
  const pacotes = {
    '1': { giros: 1, preco: 10 },
    '6': { giros: 6, preco: 50 },
    '13': { giros: 13, preco: 100 }
  };
  
  res.json({
    success: true,
    giros_adicionados: pacotes[pacote].giros,
    message: `✅ ${pacotes[pacote].giros} giros comprados!`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor online na porta ${PORT}`);
});