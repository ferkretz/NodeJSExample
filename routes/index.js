var express = require('express');
var router = express.Router();

// Home router (/)
router.get('/', function(req, res, next) {
  // It's too simple using only view modell no dao or repository
  res.render('index', {
      title: __('index.title'),
      tableMessage: __('index.tableMessage {{database}}', { database: db.getDatabase() })
  });
});

module.exports = router;
