const db = require('../dbConfig');

module.exports = {
  find,
  findBy,
  findById,
  add
};

function find() {
  return db('users').select('id', 'user_name');
}

function findBy(filter) {
  return db('users')
    .select('id', 'user_name', 'password')
    .where(filter);
}

function findById(id) {
  return db('users')
    .select('id', 'user_name')
    .where({ id })
    .first();
}

function add(data) {
  return db('users')
    .insert(data, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}
