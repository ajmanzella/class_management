const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/', async(req, res, next) => {
    try {
        const student = await prisma.students.findUnique({
            where: req.body,
            include: {
                enrolled: true
            },
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
        const classCheck = await prisma.classes.findUnique({
            where: {
                name: cla
            }
        })
        const currentStudent = await prisma.students.findUnique({
            where: {
                name: stu
            }
        })

        if (classCheck != null) {
            claid = classCheck.id
            stuid = currentStudent.id
            const student = await prisma.students.update({
                where: {id: stuid},
                data: {
                    enrolled: {
                        connect: {
                            id: claid
                        },
                    },
                },
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
        const classCheck = await prisma.classes.findUnique({
            where: {
                name: cla
            },
            include: {
                classlist: true
            },
        })
        const currentStudent = await prisma.students.findUnique({
            where: {
                name: stu
            },
            include: {
                enrolled: true
            },
        })
        if (classCheck != null) {
            claid = classCheck.id
            stuid = currentStudent.id
            const student = await prisma.students.update({
                where: {id: stuid},
                data: {
                    enrolled: {
                        disconnect: {
                            id: claid
                        },
                    },
                },
            })
            const data = {studentInfo: student}
            res.json(data);
        }else{
            res.json({message: "Class does not exist yet. What you're doing doesn't even make sense."});
        }
    }catch(error) {
        next(error)
    }
});

module.exports = router;
