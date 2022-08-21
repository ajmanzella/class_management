const router = require('express').Router();
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/', async(req, res, next) => {
    try {
        const specClass = await prisma.classes.findUnique({
            where: req.body,
            include: {
                classlist: true
            }
        })
        const data = {classInfo: specClass}
        res.json(data)
    }catch(error) {
        next(error)
    }
});

router.put('/enrollStudent', async(req, res, next) => {
    const stu = req.body.studentName;
    const cla = req.body.className;
    try {
        const currentClass = await prisma.classes.findUnique({
            where: {
                name: cla
            }
        })
        const studentCheck = await prisma.students.findUnique({
            where: {
                name: stu
            }
        })

        if (studentCheck != null) {
            claid = currentClass.id
            stuid = studentCheck.id
            const specClass = await prisma.classes.update({
                where: {id: claid},
                data: {
                    classlist: {
                        connect: {
                            id: stuid
                        },
                    },
                },
            })
            const data = {classInfo: specClass}
            res.json(data);
        }else{
            res.json({message: "Student does not exist yet. Create it before enrolling."});
        }
    }catch(error) {
        next(error)
    }
});

router.put('/dropStudent', async(req, res, next) => {
    const stu = req.body.studentName;
    const cla = req.body.className;
    try {
        const currentClass = await prisma.classes.findUnique({
            where: {
                name: cla
            }
        })
        const studentCheck = await prisma.students.findUnique({
            where: {
                name: stu
            }
        })

        if (studentCheck != null) {
            claid = currentClass.id
            stuid = studentCheck.id
            const specClass = await prisma.classes.update({
                where: {id: claid},
                data: {
                    classlist: {
                        disconnect: {
                            id: stuid
                        },
                    },
                },
            })
            const data = {classInfo: specClass}
            res.json(data);
        }else{
            res.json({message: "Student does not exist yet. What you're doing doesn't even make sense."});
        }
    }catch(error) {
        next(error)
    }
});

module.exports = router;