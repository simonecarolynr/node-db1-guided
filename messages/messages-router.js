const express = require("express")
const db = require("../data/config")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        const messages = await db.select("*").from("messages")
        res.json(messages)
    } catch (err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const message = await db
        .select("*")
        .from("messages")
        .where("id", req.params.id)
        .limit(1)

        res.json(message)
    } catch (err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const newMessage = await db
            .insert({
                title: req.body.title,
                contents: req.body.contents
            })
            .into("messages")

            res.status(201).json(newMessage)    
        } catch (err) {
        next(err)
    }

})

router.put("/:id", async (req, res, next) => {
    await db("messages")
        .update({})
        .where("id", req.params.id)
})

router.delete("/:id", (req, res, next) => {

})

module.exports = router