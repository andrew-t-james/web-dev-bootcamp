var express = require('express');
var middleWare = require('../middleware');
var router = express.Router({ mergeParams: true });
var Campground = require('../models/campground');
var Comment = require('../models/comment');

// COMMENTS ROUTE - New
router.get('/new', middleWare.isLoggedIn, (req, res) => {
  // Find campgrounds by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { campground });
    }
  });
});

// Comments Create
router.post('/', middleWare.isLoggedIn, (req, res) => {
  // Look up campground by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      // Create new comment
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
          res.redirect('/campgrounds');
        } else {
          // Add username and id to comment
          comment.author.id = req.user.id;
          comment.author.username = req.user.username;
          // Save comment
          comment.save();
          campground.comments.push(comment);
          campground.save();
          req.flash('success', 'Successfully added comment');
          res.redirect(`/campgrounds/${campground._id}`);
        }
      });
    }
  });
});

// COMMENTS EDIT ROUTE
router.get('/:comment_id/edit', middleWare.checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id, (err, foundComments) => {
    if (err) {
      res.redirect('back');
    } else {
      res.render('comments/edit', {
        campground_id: req.params.id,
        comment: foundComments
      });
    }
  });
});

// COMMENTS UPDATE ROUTE
router.put('/:comment_id', middleWare.checkCommentOwnership, (req, res) => {
  Campground.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});

// COMMENT DESTROY ROUTE
router.delete('/:comment_id', middleWare.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if (err) {
      res.redirect('back');
    } else {
      req.flash('succes', 'Comment deleted');
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});

module.exports = router;