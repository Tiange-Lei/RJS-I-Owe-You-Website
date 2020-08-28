import express from 'express';
import bodyParser from 'body-parser';
import { v1 as uuidv1 } from 'uuid';

const app=express();
app.use(bodyParser.json());

const today = Date.now();

let favours = [
    {
      id: uuidv1(),
      publisher:'',
      award:'',
      text: 'Help with the window',
      createdAt: today,
      isAccepted: false
    }
  ]
  



var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  };
  
  app.use(allowCrossDomain);


  app.get('/favours', (req, res) => {
    res.status(200).json(favours);
  })


  app.post('/favours', (req, res) => {
    const { favour } = req.body;
    const newFavour = {
      id: uuidv1(),
      text: favour.text,
      award: favour.award,
      createdAt: new Date(),
      isAccepted: false
    }
    favours.push(newFavour)
    res.status(200).json(newFavour);
  })

  app.post('/favours/:id/accepted', (req, res) => {
    const id = req.params.id;
    console.log(`POST /favours/${id}/accepted`);
    const favourIndex = favours.findIndex(favour => favour.id === id)
    favours[favourIndex].isAccepted = true,
    res.status(200).json(favours[favourIndex]);
  })

  app.delete('/favours/:id', (req, res) => {
    const id = req.params.id;
    console.log(`DELETE /favours/${id}`);
    const favourIndex = favours.findIndex(favour => favour.id === id)
    const deletedFavour = favours.splice(favourIndex, 1);
    res.status(200).json(deletedFavour[0]);
  })




app.listen(8000,()=>console.log("Listening on port:8000"));