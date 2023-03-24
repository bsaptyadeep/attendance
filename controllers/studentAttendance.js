const Attendance = require("../models/attendanceModel");
const mongoose = require('mongoose');
require("dotenv").config();

const studentAttendance = async (req, res) => {
    try {
        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        const date_str = `${month}-${date}-${year}`
        const attendance = new Attendance({
            name: req.body.name,
            branch: req.body.branch,
            year: req.body.year,
            date: date_str,
            subject: req.body.subject
        })

        await attendance.save()
        res.status(201).send('Attendance submitted, Successfully');
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
}

const getallStudentAttendance = async (req, res, next) => {
    try {
        var name = req.query.name;
        var date = req.query.date;
        var subject = req.query.subject;
        let attendance = await Attendance.find();
        console.log(name, date, subject)
        if (name)
            attendance = attendance.filter((ob) => {
                return name == ob.name
            })
        if (date)
            attendance = attendance.filter((ob) => {
                return date == ob.date
            })
        if (subject)
            attendance = attendance.filter((ob) => {
                return subject == ob.subject
            })
        res.status(200).send(attendance);
    } catch (error) {
        res.status(400).send(error.message);
    }
}



module.exports = {
    studentAttendance,
    getallStudentAttendance
}
