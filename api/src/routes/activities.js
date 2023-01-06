const express = require('express');
const router = express.Router();
const { Activity, Country, Op} = require('../db.js');


router.post('/', async(req, res) => {

     const {name, difficulty, duration, season, countries} = req.body

     try {
        const newActivity = await Activity.create({  
            
            name, 
            difficulty, 
            duration, 
            season
        });


        await newActivity.addCountries(countries)
        res.json(newActivity);

      } catch (err) {

          res.send(err.message);
      }

})

router.get('/findactivity', async(req, res) => {

    try{
        const activity = await Activity.findAll()
        res.json(activity);

    } catch (err) {
        
        res.send(err.message);
    }
})

router.get('/filteractivity', async(req, res) => {

    const {name} = req.query

    try{
        const activities = await Activity.findAll({
            
            where: { name: {[Op.iLike]: name } },
            include: Country 
            
        })

        res.json(activities)
            
    } catch (err) {
        
        res.send(err.message);
    }
})


router.delete('/deleteactivity', async(req, res) => {

    const {id} = req.query

    try{
        await Activity.destroy({
            where: {id: id}
        })
            
        res.send("se borro correctamente")

    }catch(err){
        res.send(err.message)
    }

})


module.exports = router