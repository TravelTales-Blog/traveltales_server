const express = require('express');
 
 const router = express.Router();
 router.get('/', (req, res) => {
     res.status(200).json({ message: 'CW2 Server is up and running' });
   });
 
 module.exports = router;