const fs = require('fs/promises');
const { join } = require('path');

const filename = join(__dirname, '../talker.json');

const readAllTalkers = async () => {
  const dataTalkers = await fs.readFile(filename, 'utf8');
  return JSON.parse(dataTalkers);
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

module.exports = {
  readAllTalkers,
  getAllTalkers,
  getTalkerById,
};
