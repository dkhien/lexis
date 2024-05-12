const express = require('express');
const path = require('path');

const router = express.Router();

/* GET result file to download. */
router.get('/:resultFile', async (req, res) => {
  res.sendFile(path.join(__dirname, `../results/${req.params.resultFile}`));
});

module.exports = router;
