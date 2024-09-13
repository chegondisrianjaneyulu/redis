const express = require('express');
const { pool } = require('./db');
const {redisClient} = require('./redis');

const router = express.Router();

router.get('/', async (req, res) => {
    try {

       const sqlQuery = "SELECT * FROM users"
       const {rows} = await pool.query(sqlQuery);
       res.status(200).send({data:rows})
    }
    catch (e) {
       res.status(500).send({e:e?.message})
    }
});

router.post('/', async (req, res) => {
    try {
      let {name, email, age} = req.body
      const sqlQuery = `INSERT INTO users (name, email, age)  VALUES ($1, $2, $3) RETURNING *`
      const values = [name, email, age];
      const {rows} = await pool.query(sqlQuery, values);
      res.status(200).send({data:rows})
    }
    catch (e) {
        res.status(500).send({e:e?.message})
    }
});

router.put('/:id', async (req, res) => {
    try {
      let id = req.params.id;
      let {name, email, age} = req.body;
       
      const sqlQuery = `UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *`
      const values = [name, email, age, id];
   
      const {rows} = await pool.query(sqlQuery, values);

      if (rows.length === 0) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).json(rows[0]);
    }
    catch (e) {
        res.status(500).send({e:e?.message})
    }
});

router.delete('/:id', async (req, res) => {
    try {
       let id = req.params.id;
       let sqlQuery = `DELETE FROM users WHERE id = $1 RETURNING *`
       let values = [id];
       const {rows} = await pool.query(sqlQuery, values);

       if ( rows.length === 0 ) {
         return res.status(404).send({ message: "User not found" });
       }

       res.status(200).json({ message: "User deleted", user: rows[0] });
    }
    catch (e) {
        res.status(500).send({e:e?.message})
    }
});

module.exports = router