const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    ok: true,
    service: 'docs-assistant-api'
  });
});

module.exports = router;
