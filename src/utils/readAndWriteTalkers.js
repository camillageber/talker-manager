const fs = require('fs/promises');
const { join } = require('path');

const filename = join(__dirname, '../talker.json');

const readAllTalkers = async () => {
  const dataTalkers = await fs.readFile(filename, 'utf8');
  return JSON.parse(dataTalkers);
};

const writeNewTalkers = async (newTalker) => {
  try {
    const talkers = await readAllTalkers();
    talkers.push(newTalker);
    const insertion = await fs.writeFile(filename, JSON.stringify(talkers));
    return insertion;
  } catch (e) {
    console.log('erro em inserir novo talker', e);
  }
};

const getAllTalkers = async () => {
  const allTalkers = await readAllTalkers();
  if (!allTalkers) {
    return [];
  }
  return allTalkers;
};

const getTalkerById = async (id) => {
  const talkers = await readAllTalkers();
  const talkerId = talkers.find((talker) => talker.id === Number(id));
  return talkerId;
};

const updateTalkers = async (talkers) => {
  try {
    await fs.writeFile(filename, JSON.stringify(talkers));
  } catch (error) {
    console.log('não atualizou', error);
  }
};

// lógica utilizada na aula 22.4 - turma 21/A:
const changeTalker = async (talker, id) => {
  try {
    const arrayTalkers = await readAllTalkers();
    console.log(arrayTalkers);
    let changedTalker;
    
    for (let i = 0; i < arrayTalkers.length; i += 1) {
      if (arrayTalkers[i].id === Number(id)) {
        arrayTalkers[i].name = talker.name;
        arrayTalkers[i].age = talker.age;
        arrayTalkers[i].talk = talker.talk;
        changedTalker = arrayTalkers[i];
      }
    }
    await updateTalkers(arrayTalkers);
    return changedTalker;
  } catch (error) {
    console.log('Erro em edição', error);
  }
};

module.exports = {
  readAllTalkers,
  getAllTalkers,
  getTalkerById,
  writeNewTalkers,
  changeTalker,
  updateTalkers,
};
