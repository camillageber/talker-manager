const express = require('express');
const { getAllTalkers } = require('../utils/readAndWriteTalkers');

const routerTalkers = express.Router();

routerTalkers.get('/', async (req, res) => {
  const allTalkers = await getAllTalkers();
  res.status(200).json(allTalkers);
});

module.exports = routerTalkers;