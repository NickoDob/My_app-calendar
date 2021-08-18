const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'my_db3',
  password: 'postgres',
  port: 5432,
});

const getMerchants = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM my_db3 ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}
const createMerchant = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, email } = body
    pool.query('INSERT INTO my_db3 (name, username, email, phone) VALUES ($1, $2, $3, $4) RETURNING *', [name, username, email, phone], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve('A new merchant has been added added: ${results.rows[0]}')
    })
  })
}
const deleteMerchant = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM my_db3 WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Merchant deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getMerchants,
  createMerchant,
  deleteMerchant,
}