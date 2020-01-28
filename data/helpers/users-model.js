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
  return db('users as u')
    .select('u.id', 'u.user_name', 'u.password')
    .where(filter);
}

function findById(id) {
  return db('users as u')
    .select('u.id', 'u.user_name')
    .where({ id })
    .first();
}

function add(data) {
  return db('users')
    .insert(data)
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}
