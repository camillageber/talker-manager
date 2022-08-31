const express = require('express');
const {
  getAllTalkers,
  getTalkerById,
  writeNewTalkers,
  changeTalker,
  readAllTalkers,
  updateTalkers,
} = require('../utils/readAndWriteTalkers');
const {
  tokenValidation,
  nameValidation,
  ageValidation,
  watchedAtValidation,
  talkValidation,
} = require('../middlewares/talkersValidation');

const routerTalkers = express.Router();

// rota para trazer os palestrantes por id - req 2
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

// rota para inserir um novo talker em POST /talker, com validações - req 5
routerTalkers.post(
  '/',
  tokenValidation,
  ageValidation,
  nameValidation,
  talkValidation,
  watchedAtValidation,
  async (req, res) => {
    const talker = req.body;
    const talkers = await getAllTalkers();

    const newIdTalker = Number(talkers.slice(-1)[0].id) + 1; /* fonte: https://discuss.codecademy.com/t/advanced-slice-functionality-array-slice-1-0/528432 */
    talker.id = newIdTalker;
    await writeNewTalkers(talker);
    res.status(201).json(talker);
  },
);

// rota para modificar dados de um talker, sem alterar o id - req 6
routerTalkers.put(
  '/:id',
  tokenValidation,
  ageValidation,
  nameValidation,
  talkValidation,
  watchedAtValidation,
  async (req, res) => {
    let newTalker = req.body;

    const { id } = req.params;
    newTalker = {
      ...newTalker,
    };
  
    const changedTalker = await changeTalker(newTalker, id);
    return res.status(200).json(changedTalker);
  },
);

// rota para deletar um talker do json - req 7
routerTalkers.delete('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  const talkers = await readAllTalkers();
  const deletedTalker = talkers.filter((talker) => talker.id !== Number(id));
  await updateTalkers(deletedTalker);
  return res.sendStatus(204);
});

module.exports = routerTalkers;