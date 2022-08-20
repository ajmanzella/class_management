const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/', async(req, res, next) => {
    try {
        const student = await prisma.students.findUnique({
            where: req.body,
        })
        const data = {studentInfo: student}
        res.json(data)
    }catch(error) {
        next(error)
    }
});

router.put('/enrollClass', async(req, res, next) => {
    const stu = req.body.studentName;
    const cla = req.body.className;

    try {
        const classCheck = await prisma.classes.findUnique({})
        if (classCheck != null) {
            const student = await prisma.students.update({
                where: stu,
                data: cla,
            })
            const data = {studentInfo: student}
            res.json(data);
        }else{
            res.json({message: "Class does not exist yet. Create it before enrolling."});
        }
    }catch(error) {
        next(error)
    }
});

router.put('/dropClass', async(req, res, next) => {
    const stu = req.body.studentName;
    const cla = req.body.className;
    
    try {
        const student = await prisma.students.update({
            where: req.body,
            data: req.body,
        })
        const data = {studentInfo: student}
        res.json(data)
    }catch(error) {
        next(error)
    }
});

module.exports = router;
