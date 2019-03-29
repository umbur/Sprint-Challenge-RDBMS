const express = require('express');

const server = express();
server.use(express.json());

const db = require('../data/helpers/model.js');

// Endpoints for *** Projects ***
// POST for adding projects:
server.post('/api/projects', (req,res) => {
  const project = req.body;
  if(project.name && project.project_description) {
    db.addProject(project)
      .then(id => {
        res.status(201).json(id) 
      })
      .catch(err => {
        res.status(500).json({message: 'Failed to add project'})
      })
  } else {
    res.status(400).json({message: 'Missing project name or project_description'})
  }
})

server.get('/api/projects', (req, res) => {
  db.getProject()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(() => {
      res.status(500).json({message: 'Failed to get projects'})
    })
})

//GET for retrieving a project by its id that returns an object:
server.get('/api/projects/:id', (req, res) => {
  const {id} = req.params;
  db.getProject(id)
    .then(project => {
      console.log(project)
      if(project[0]) {
          db.getAction(id)
          .then(actions => {
            project = project[0]
            project.actions = actions;
            project.project_complete === 0 ? project.project_complete = false : project.project_complete = true;
            actions.forEach(action => {
              action.project_complete === 0 ? action.project_complete = false : action.project_complete = true;
            })
            res.status(200).json(project)
          })
        } else {
        res.status(404).json({message: 'Project not found under current id'})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'Failed to get Project'})
    })
})

// Endpoints for *** Actions ***
// POST for adding actions:
server.post('/api/actions', async (req, res) => {
    const action = req.body;
    if (action.action_description && action.project_id && action.notes) {
        db.getProject(action.project_id)
        .then(project => {
            if(project[0]) {
              db.addAction(action)
                .then(id => {
                  res.status(201).json(id)  
                })
                .catch(err => {
                  res.status(500).json({message: 'failed to add action'})
                })
            } else {
              res.status(500).json({message: 'No project under that project_id'})
            }
          })
        .catch(err => {
          res.status(500).json({message: 'failed to check projects'})
        })
    } else {
        res.status(400).json({ message: 'Please provide action_description, project_id and notes' });
    }
  })


module.exports = server;
