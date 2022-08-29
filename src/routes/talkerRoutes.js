const express = require('express');
const {
  getAllTalkers,
  getTalkerById,
} = require('../utils/readAndWriteTalkers');

const routerTalkers = express.Router();

routerTalkers.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkerId = await getTalkerById(id);
  if (!talkerId) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talkerId);
});

// rota para trazer todos os palestrantes - req 1
routerTalkers.get('/', async (req, res) => {
  const allTalkers = await getAllTalkers();
  res.status(200).json(allTalkers);
});

module.exports = routerTalkers;
