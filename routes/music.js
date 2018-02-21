var express = require('express')
var express = require('express')
var router = express.Router()
var Music = require('../models').Music

router.put('/:id', function(req, res){
  Music.update(
    {title: req.body.title },
    { where: { id: req.params.id}}
  )
  .then( function() {
    return res.redirect('/music')
  })
})

/* GET music artists. */
router.get('/', function(req, res){
  Music.all()
  .then( function(music) {
    res.render('music', {music: music});
  });
});
/* POST add music listing */
router.post('/', function(req, res){
  var title = req.body.title;
  Music.create({ title: title })
  .then( function() {
    res.redirect('/music');
  });
});

router.delete('/:id', function(req, res) {
  Music.findById(req.params.id)
  .then( function(music){
    music.destroy()
  })
  .then( function() {
    return res.redirect('music');
  });
});

router.get('/:id/edit', function(req, res){
  Music.findById(req.params.id)
  .then( function(music) {
    return res.render('edit', {music: music });
  });
});

router.put('/:id', function(req, res) {
  Music.update(
    { title: req.body.title},
    { where: { id: req.params.id} }
  )
  .then( function() {
    return res.redirect('/music');
  });
});

router.get('/', function(req, res) {
  Music.all({
    order: [
      ['createdAt', 'ASC']
    ]
  })
  .then( function(music){
    res.render('music', {music: music })
  })
})


module.exports = router;