const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async(req, res, next) => {
    try {
        const students = await prisma.students.findMany({})
        const classes = await prisma.classes.findMany({})
        const data = {studentList: students, classList: classes}
        res.json(data)
    }catch(error) {
        next(error)
    }
});

router.post('/newClass', async(req, res, next) => {
    const newClass = await prisma.classes.create({
        data: req.body,
    })
    console.log(req.body)
    res.send({message: 'Class Created'});
});

router.delete('/removeClass', async(req, res, next) => {
    const removedClass = await prisma.classes.delete({
        where: req.body,
    })
    console.log(req.body)
    res.send({message: 'Class Removed'});
});

router.post('/newStudent', async(req, res, next) => {
    const newStudent = await prisma.students.create({
        data: req.body,
    })
    console.log(req.body)
    res.send({message: 'Student Created'});
});

router.delete('/removeStudent', async(req, res, next) => {
    const removedStudent = await prisma.students.delete({
        where: req.body,
    })
    console.log(req.body)
    res.send({message: 'Student Deleted'});
});

module.exports = router;