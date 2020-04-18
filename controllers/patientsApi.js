const reportModel = require('../models/reportModel');
const patientModel = require('../models/patientModel');


module.exports.createReport = async function(req,res){
    
    try {
        var patient = await patientModel.findById(req.params.id);
        if(patient){
            
            var report = await reportModel.create({
                doctor : req.user.name,
                patient : patient._id,
                status : req.body.status
            });
            
            patient.reports.push(report._id);
            patient.save();

            return res.status(200).json({
                message : "Patient Report Created :)"
            });
        }
        res.status(200).json({
            message : "Patient Not Found :("
        });
    } catch (error) {
        return res.status(200).json({
            message : "error occurred at Server :(  " + error
        });
    }
};
module.exports.getReportByPatient = async function(req,res){
    try {
        var patient = await patientModel.findById(req.params.id);
        if(patient){

            var patient = await patient.populate('reports','status doctor').execPopulate();

            return res.status(200).json({
                message : "Patient Reports Found ",
                patient : patient
            });
        }
        res.status(200).json({
            message : "Patient Not Found :("
        });
    }catch (error) {
        return res.status(200).json({
            message : "error occurred at Server :(  " + error
        });
    }
};