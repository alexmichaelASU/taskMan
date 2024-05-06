const  List  = require('../models/list.model');
const  Task  = require('../models/task.model');

// List Endpoints

// Get all lists
exports.getAllLists = async (req, res, next) => {
    try {
        const lists = await List.find();
        res.status(200).json(lists);
    } catch (error) {
        next(error);
    }
};

exports.getListsByEmail = async (req, res, next) => {
    try {
        const email = req.params.email;
        const lists = await List.find({ email });
        if (lists.length === 0) {
            return res.status(404).json({ message: 'No lists found for this email' });
        }
        res.status(200).json(lists);
    } catch (error) {
        next(error);
    }
};


// Create a new list
exports.createList = async (req, res, next) => {
    try {
        const newList = new List(req.body);
        const savedList = await newList.save();
        res.status(201).json(savedList);
    } catch (error) {
        next(error);
    }
};

// Update a list
exports.updateList = async (req, res, next) => {
    try {
        const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedList) {
            return res.status(404).json({ message: 'List not found' });
        }
        res.status(200).json(updatedList);
    } catch (error) {
        next(error);
    }
};

// Delete a list
exports.deleteList = async (req, res, next) => {
    try {
        const listId = req.params.id;
        
        const deletedList = await List.findByIdAndDelete(listId);
        
        if (!deletedList) {
            return res.status(404).json({ message: 'List not found' });
        }

        await Task.deleteMany({ _listId: listId });

        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

exports.deleteListsByEmail = async (req, res, next) => {
    try {
        const email = req.params.email;
        
        const lists = await List.find({ email });
        
        if (lists.length === 0) {
            return res.status(404).json({ message: 'No lists found for this email' });
        }

        const listIds = lists.map(list => list._id);

        await Task.deleteMany({ _listId: { $in: listIds } });

        await List.deleteMany({ email });

        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

// Task Endpoints

// Get all tasks for a list
exports.getTasksForList = async (req, res, next) => {
    try {
        const tasks = await Task.find({ _listId: req.params.listId });
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

// Create a new task
exports.createTask = async (req, res, next) => {
    try {
        const listId = req.params.listId;

        const list = await List.findById(listId);
        
        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }

        const newTask = new Task({
            title: req.body.title,
            _listId: listId,
        });
        
        const savedTask = await newTask.save();
        
        res.status(201).json(savedTask);
    } catch (error) {
        next(error);
    }
};

// Update a task
exports.updateTask = async (req, res, next) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
};

// Delete a task
exports.deleteTask = async (req, res, next) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};
