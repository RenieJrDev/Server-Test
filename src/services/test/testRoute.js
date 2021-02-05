const express = require('express'),
    TestSchema = require('./testSchema')

const testRouter = express.Router()

//POST
testRouter
    .route('/')
    .post(async (req, res, next) => {
        try {
            const newTest = new TestSchema(req.body),
                { _id } = await newTest.save()
            res.status(201).send(newTest)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
//GET
testRouter
    .route('/')
    .get(async (req, res, next) => {
    try {
        const tests = await TestSchema.find()
        res.send(tests)
    } catch (error) {
        console.log(error)
        next(error)
    }
    })
//GET BY ID
testRouter
    .route('/:id')
    .get(async (req, res, next) => {
        const id = req.params.id
        try {
            if (id) {
                const singleTest = await TestSchema.findById(id)
                res.send(singleTest)
            } else {
                const error = new Error()
                error.message = 'OBJECT NOT FOUND - ID IS MISSING'
                error.httpStatusCode = 404
                next(error)
            }
    } catch (error) {
            console.log(error)
            next(error)
    }
    })
//PUT
testRouter
    .route('/:id')
    .put(async (req, res, next) => {
        const id = req.params.id
        let body = req.body
        try {
            if (id && body) {
                const editTest = await TestSchema.findByIdAndUpdate(id, body, {
                    runValidators: true,
                    new : true
                })
                res.send(editTest)
            }
            else if (!id) {
                const error = new Error()
                error.message = 'OBJECT NOT FOUND - ID IS MISSING'
                error.httpStatusCode = 400
                next(error)
            }
            else if (!body) {
                const error = new Error()
                error.message = 'CANNOT EDIT OBJECT - BODY IS MISSING'
                error.httpStatusCode = 404
                next(error)
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

//DELETE
testRouter
    .route('/:id')
    .delete(async (req, res, next) => {
    const id = req.params.id
        try {
            if (id) {
                const deleteTest = await TestSchema.findByIdAndDelete(id)
                res.send(`Object with id : ${id} has been deleted`)
            } else {
                const error = new Error()
                error.message = 'OBJECT NOT FOUND - ID IS MISSING'
                error.httpStatusCode = 404
                next(error)
            }
            
    } catch (error) {
            console.log(error)
            next(error)
    }
    })

module.exports = testRouter