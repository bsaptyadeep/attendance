const Attendance = require("../models/attendanceModel");
const mongoose = require('mongoose');
const { time } = require("console");
require("dotenv").config();

const studentAttendance = async (req, res) => {
    try {
        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        // time in HH:MM:SS
        let time_str = `${date_ob.getHours()}:${date_ob.getMinutes()}:${date_ob.getSeconds()}`;
        // date in MM-DD-YYYY
        const date_str = `${month}-${date}-${year}`
        const attendance = new Attendance({
            name: req.body.name,
            branch: req.body.branch,
            year: req.body.year,
            mentor: req.query.mentor,
            date: date_str,
            time: time_str,
            subject: req.query.subject
        })
        console.log('post-attendance', attendance);
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
        var mentor = req.query.mentor;
        let attendance = await Attendance.find();
        console.log('get attendance for ---> name: ', name,'date: ', date, 'subject: ', subject, 'mentor: ', mentor);
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
        if (mentor)
            attendance = attendance.filter((ob) => {
                return mentor == ob.mentor
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
