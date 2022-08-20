const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async(req, res, next) => {
    try {
        const specClass = await prisma.classes.findUnique({
            where: req.body,
        })
        const data = {classInfo: specClass}
        res.json(data)
    }catch(error) {
        next(error)
    }
});

router.put('/enrollStudent', async(req, res, next) => {
    try {
        const specClass = await prisma.classes.update({
            where: req.body,
        })
        const data = {classInfo: specClass}
        res.json(data)
    }catch(error) {
        next(error)
    }
});

router.put('/dropStudent', async(req, res, next) => {
    try {
        const specClass = await prisma.classes.update({
            where: req.body,
        })
        const data = {classInfo: specClass}
        res.json(data)
    }catch(error) {
        next(error)
    }
});

module.exports = router;