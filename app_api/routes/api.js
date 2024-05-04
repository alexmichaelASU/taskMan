const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');
const ctrlAuth = require('../controllers/authentication');
const  jwt  = require('jsonwebtoken');


const auth = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ error: 'Token error' });
    }
   
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ error: 'Token invalid, authorization denied' });
        }
        
        req.user = decoded;
        
        next();
    });
};

    

// List routes
router.get('/lists',  auth, apiController.getAllLists);
router.get('/lists/by-email/:email', apiController.getListsByEmail);
router.post('/lists',  auth,  apiController.createList);
router.put('/lists/:id',  auth, apiController.updateList);
router.delete('/lists/:id',  auth, apiController.deleteList);

// Task routes
router.get('/lists/:listId/tasks',  auth,  apiController.getTasksForList);
router.post('/lists/:listId/tasks',  auth,  apiController.createTask);
router.put('/tasks/:id',  auth,  apiController.updateTask);
router.delete('/tasks/:id',  auth,  apiController.deleteTask);

// Authenticatoin routes
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.get('/:email', ctrlAuth.getUser);
router.get('/name/:email', ctrlAuth.getUserNameByEmail);
module.exports = router;