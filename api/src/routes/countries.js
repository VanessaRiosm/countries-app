const express = require('express');
const router = express.Router();
const { Country, Activity, Op } = require('../db.js');
const axios = require('axios')


router.get('/', async(req, res) => {

    const {name} = req.query
    let countries = await Country.findAll()

    if(countries.length !== 0){

        if(name){

            const country = await Country.findAll({
                where: { name: {[Op.iLike]: `%${name}%`} }
            });
            
            return res.json(country)
        }
        return res.json(countries)

    } else {     

        try {    
            let newInfo = []
            const {data} = await axios.get('https://restcountries.com/v3/all')
            
            data.map(e => {

                let confirmCapital = ""

                if(e.capital) confirmCapital = e.capital[0]
                else confirmCapital = "No capital"

                newInfo.push({
                        id: e.cca3,
                        name: e.name.common,
                        image: e.flags[1],
                        continent: e.continents[0],
                        capital: confirmCapital,
                        subRegion: e.subregion,
                        area: e.area,
                        population: e.population
                    })
                    
            })
            await Country.bulkCreate(newInfo)
            return res.json(newInfo)

        } catch (err) {
            res.send(err.message)

        }
    }
})


router.get('/:id', async(req, res) => {

    const {id} = req.params
    
    try{
        const country = await Country.findAll({
            where: { id: id },
            include: Activity 
        });
        res.json(country)

    } catch (err) {
        res.send(err.message)
    }

} )


module.exports = router;