var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://prem:restinpeace@ds123182.mlab.com:23182/mytasklist_prem',['tasks']);

//get all tasks
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        else{
            res.json(tasks);
        }
    });
});

//get single tasks
router.get('/tasks/:id', function(req, res, next){
    db.tasks.findOne({_id:mongojs.ObjectId(req.params.id)},function(err, tasks){
        if(err){
            res.send(err);
        }
        else{
            res.json(tasks);
        }
    });
});
//Save Task
router.post('/tasks', function(req, res, next){
    var task = req.body;
    if(!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        })
    }
    else{
        db.tasks.save(task, function(err, task){
            if(err){
                res.end(err);
            }
            else{
                res.json(task);
            }
        })
    }
});

//Delete Task 
router.delete('/tasks/:id', function(req, res, next){
    db.tasks.remove({_id:mongojs.ObjectId(req.params.id)},function(err, tasks){
        if(err){
            res.send(err);
        }
        else{
            res.json(tasks);
        }
    });
});

//Update Task
router.put('/tasks/:id', function(req, res, next){

    var task = req.body;
    var updTask = {};

    if(task.isDone){
        updTask.isDone = task.isDone;
    }
    if(task.title){
        updTask.title = task.title;
    }

    if(!updTask){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } 
    else {
        db.tasks.update({_id:mongojs.ObjectId(req.params.id)},updTask,{}, function(err, tasks){
        if(err){
            res.send(err);
        }
        else{
            res.json(tasks);
        }
    });

    }


});

module.exports = router;