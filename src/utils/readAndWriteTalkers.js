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

module.exports = {
  readAllTalkers,
  getAllTalkers,
};
