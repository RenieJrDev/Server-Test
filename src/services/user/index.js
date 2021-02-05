const express = require('express'),
    UserModel = require('./model')

const userRouter = express.Router()

//METHODS
//POST
userRouter
    .route('/')
    .post(async (req, res, next) => {
        const body = req.body
        try {
            const newUser = await new UserModel(body),
                { _id } = await newUser.save()
            res.send(newUser)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

//GET
userRouter
    .route('/')
    .get(async (req, res, next) => {
        const userList = []
        try {
            if (req.query) {
                const query = req.query
                userList = await UserModel.find(query)
            } else {
                userList = await UserModel.find()
            }
            res.send(userList)
        } catch (error) {
            console.log(error)
            next(error)
        }
})
//GET BY ID
userRouter
    .route('/:userId')
    .get(async (req, res, next) => {
        const userId = req.params.userId
        try {
            const user = await UserModel.findById(userId)
            res.send(user)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
//PUT
userRouter
    .route('/:userId')
    .put(async (req, res, next) => {
        const userId = req.params.userId
        const body = req.body
        try {
            const userToEdit = await UserModel.findByIdAndUpdate(userId, body, { runValidators: true, new: true })
            res.send(userToEdit)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

//DELETE
userRouter
    .route('/:userId')
    .delete(async (req, res, next) => {
        const userId = req.params.userId
        try {
            const userDeleted = await UserModel.findByIdAndRemove(userId)
            res.send(`User with ID : ${userId} has been deleted`)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

module.exports = userRouter