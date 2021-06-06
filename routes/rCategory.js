const express = require('express');
const router = express();
const mCategory = require('../models/mCategory');


router.post('/createCategory',(req,res)=>{
    let newCategory = new mCategory(req.body);
    newCategory.save((saveErr,saveRes)=>{
        if(saveErr){
            res.status(500).send(saveErr)
        }else{
            res.status(200).send(saveRes);
        }
    })
})

router.get('/getAllCateogry',(req,res)=>{
    mCategory.find({},(findErr,findDocs)=>{
        if(findErr){
            res.status(500).send(findErr);
        }else{
            res.status(200).send(findDocs);
        }
    })
})

module.exports = router;
