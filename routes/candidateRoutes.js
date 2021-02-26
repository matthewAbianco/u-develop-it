const express = require('express');
const router = express.Router();
const db = require('../../db/database');
const inputCheck = require('../../utils/inputCheck');

// Create a candidate
router.post('/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql =  `INSERT INTO candidates (first_name, last_name, industry_connected) 
                  VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];
    // ES5 function, not arrow function, to use this
    db.run(sql, params, function(err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: body,
        id: this.lastID
      });
    });
  });
  
  // Delete a candidate
  router.delete('/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id]
    db.run(sql, params, function(err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
  
      res.json({ message: 'successfully deleted', changes: this.changes });
    });
  });

  // originally app.get('/api/candidates')
router.get('/candidates', (req, res) => {
    // internal logic remains the same
  });
  
  // app.get('/api/candidate/:id')
  router.get('/candidate/:id', (req, res) => {});
  
  // app.post('/api/candidate')
  router.post('/candidate', ({ body }, res) => {});
  
  // app.put('/api/candidate/:id')
  router.put('/candidate/:id', (req, res) => {});
  
  // app.delete('/api/candidate/:id')
  router.delete('/candidate/:id', (req, res) => {});

  module.exports = router;