var express = require('express');
var router = express.Router();

// Database table router (/table)
router.get('/', function (req, res, next) {
    db.listTables(function (err, results) {
        if (err) {
            if (err)
                return next(err);
        } else {
            res.render('table_index', {
                title: __('table.index.title {{database}}', {database: db.getDatabase()}),
                results: results
            });
        }
    });

});

// Database describe router (/table/{tablename})
router.get('/:name', function (req, res, next) {
    db.describeTable(req.params.name, function (err, results) {
        if (err) {
            if (err)
                return next(err);
        } else {
            res.render('table_details', {
                title: __('table.details.title {{table}}', {table: req.params.name}),
                results: results
            });
        }
    });
});

module.exports = router;
