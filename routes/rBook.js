const express = require('express');
const router = express();
const mBook = require('../models/mBook');
const mCategory = require('../models/mCategory');

router.post('/addBook',(req,res)=>{
    let newBook = new mBook(req.body);
    newBook.save((saveErr,saveRes)=>{
        if(saveErr){
            res.status(500).send(saveErr);
        }else{
            mCategory.find({categoryType:req.body.categoryType},(findErr,findRes)=>{
                if(findErr){
                    res.status(500).send(findErr);
                }else{
                    findRes[0].bookQty = findRes[0].bookQty + 1;
                    findRes[0].save((saveErr,saveRes)=>{
                        if(saveErr){
                            res.send(saveErr);
                        }else{
                            // console.log("Saved");
                            res.status(200).send("Book Saved Successfully")
                        }
                    })
                }
            })
            // res.status(200).send(saveRes)
        }
    })
})

router.get('/getAllBook',(req,res)=>{
    mBook.find({status:'For Sale'},(findErr,findRes)=>{
        if(findErr){
            res.status(500).send(findErr);
        }else{
            res.status(200).send(findRes);
        }
    })
})

router.post('/buyBook',(req,res)=>{
    mBook.findOne({bookName:req.body.bookName},{categoryType:req.body.categoryType},(findErr,findRes)=>{
        if(findErr){
            res.status(500).send(findErr);
        }else{
            findRes.status = "Sold Out",
            findRes.save((saveErr,saveRes)=>{
                if(saveErr){
                    res.send(saveErr);
                }else{
                    mCategory.findOne({categoryType:req.body.categoryType},(categoryErr,categoryRes)=>{
                        console.log(categoryRes)
                        categoryRes.bookQty = categoryRes.bookQty - 1;
                        categoryRes.save((saveErr,saveRes)=>{
                            if(saveErr){
                                res.status(500).send(saveErr)
                            }else{
                                res.status(200).send("Thanks for purchasing");
                            }
                        })
                    })
                }
            })
        }   
    })
})


module.exports = router;