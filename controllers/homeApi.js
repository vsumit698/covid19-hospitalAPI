const doctorModel = require('../models/doctorModel');
const patientModel = require('../models/patientModel');
const reportModel = require('../models/reportModel');

module.exports.registerPatient = async function(req,res){
    
    try {
        var patient = await patientModel.findOne({phone:req.body.phone});
        if(patient){
            return res.status(200).json({
                message : "Patient Already Exists",
                patient : patient
                
            });
        }
        patient = await patientModel.create({phone : req.body.phone});

        var doctor = await doctorModel.findById(req.user.id);
        doctor.patients.push(patient._id);
        doctor.save();

        res.status(200).json({
            message : "Patient Successfully Registered :)"
        });
    } catch (error) {
        return res.status(200).json({
            message : "error occurred at Server :(" + error
        });
    }
};

module.exports.getReportByStatus = async function(req,res){
    try {
        var reports = await reportModel.find({status : req.params.status}).populate('patient','phone');
        if(reports.length==0){
            return res.status(200).json({
                message : "No Reports fot this Status :( "
            });
        }
        res.status(200).json({
            message : "Reports Found Successfully :)",
            reports : reports
        });
    } catch (error) {
        return res.status(200).json({
            message : "error occurred at Server :(" + error
        });
    }
};
