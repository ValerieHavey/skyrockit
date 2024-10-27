const express = require('express');
const router = express.Router();

const User = require('../models/user');

/*
Action: Index
Method: GET
Route: /users/:userID/applications
Description: Show all applications for the given user
*/

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id); 
        res.render('applications/index.ejs', {
            applications: currentUser.applications, 
    });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

/**
 * Action: SHOW/VIEW
 * Method: GET
 * Route: /users/:userID/applications/:applicationId
 * Description: Show the details for an application
 */

router.get('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId);

        res.render('applications/show.ejs', {
            application: application,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

/*
Action: New
Method: Get
Route: /users/:userID/applications/new
Description: Show form for creating a new application
*/

router.get('/new', async (req, res) => {
    res.render('applications/new.ejs');
});


/* 
Action: Create
Method: POST
Route: /users/:userID/applications
Description: Create a new application for the given user

*/

router.post('/', async (req, res) => {
    try {
        // Let's find the user for which we are creating the application
        const currentUser = await User.findById(req.session.user._id);

        currentUser.applications.push(req.body);

        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/applications`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:applicationID/edit', async (req, res) => {
    try {
        //Let's find the user for which we are creating the application
        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId);

        res.render('applications/edit.ejs', {
            application: application,
        })
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.put('/:applicationId', async (req, res) => {
    try {
        //Let's find the user for which we are creating the application
      const currentUser = await User.findById(req.session.user._id);
      const application = currentUser.applications.id(req.params.applicationId);

      application.set(req.body);

      await currentUser.save();

      res.redirect(`/users/${currentUser._id}/applications/${req.params.applicationId}`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

/*
Action: Delete
Method: Delete
Route: /users/:userId/applications/:applicationId
Description:
*/

router.delete('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.applications.id(req,params,applicationId).deleteOne();
        await currentUser.save();

        res.redirecft(`/users/${currentUser._id}/applications`);
    } catch(error) {
        console.log(error);
        res.redirect('/');
    }
});


module.exports = router;