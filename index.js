const express = require('express')
const { queryPromise } = require('./queryPromise')

async function createApp() {
  const app = express()
  const sqlTable = `CREATE TABLE IF NOT EXISTS people(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))`;

  await queryPromise.query(sqlTable)

  const peoples = [['Iberê Thenório'], ['Mariana Fulfaro'], ['Leon Martins'], ['Nilce Moretto'], ['Gabriel Fróes'], ['Vanessa Weber'], ['Filipe Dechamps']]
  const sqlInsert = `INSERT INTO people(name) VALUES ?`;

  await queryPromise.queryMultiple(sqlInsert, peoples)

  app.get('/', async (req, res) => {
    const sqlSelect = `SELECT * FROM people`
    const all = await queryPromise.query(sqlSelect)

    const html = `<h1>Tech Peoples</h1>\n
  <ul>
    ${all.map(p => `<li>${p.name}</li>`).join('')}
  </ul>`

    res.send(html)
  })
  return app
}

module.exports = createApp