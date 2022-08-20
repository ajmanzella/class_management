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
    
    //const newClass = await prisma.classes.create({
        //data: {name: 'CSE250'},
    //})
    console.log(req.body)
    res.send({message: 'api is working'});
});

router.delete('/removeClass', async(req, res, next) => {
    res.send({message: 'api is working'});
});

router.post('/newStudent', async(req, res, next) => {
    //const newStudent = await prisma.students.create({
        //data: {name: 'Anthony Manzella'},
    //})
    console.log(req.body)
    res.send({message: 'api is working'});
});

router.delete('/removeStudent', async(req, res, next) => {
    console.log(req.body)
    res.send({message: 'api is working'});
});

module.exports = router;