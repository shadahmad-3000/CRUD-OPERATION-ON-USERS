const Employee = require("../models/employee.model");


//register user
const createEmpService = async (body) => {
    try {
        const { name, email, mobileNo, employeeID, designation, joiningDate } = body;
        if (!name || !email || !mobileNo || !employeeID || !designation || !joiningDate) {
            throw new Error("All parameters must be provided");
        }
        const createEmp = {
            name,
            email,
            mobileNo,
            employeeID,
            designation,
            joiningDate
        };
        const currEmp = await Employee.create(createEmp);
        console.log("User Registered", currEmp);
        return {
            status: 200,
            message: "User registered Successfully",
            data: currEmp
        }
    } catch (error) {
        console.error(error?.message || error?.data || error, "Internal Server Error");
        return {
            status: 500,
            message: "Oop's Error Detected"
        }
    }
}
const updateEmpService = async (param, body) => {
    try {
        const { employeeId } = param;
        const { updateData } = body;

        const updateEmp = await Employee.findOneAndUpdate(
            { employeeID: employeeId },
            { $set: {updateData} },
            { new: true }
        )
        console.log("Employee's Data Updated",updateEmp);
        
        if (!updateEmp) {
            return {
                status: 404,
                message: "Employee Not Found",
            }
        }
        return {
            status: 200,
            message: "Employee Updated Successfully",
            data: updateEmp
        }
    } catch (error) {
        console.error(error?.message || error, "Internal Servern error");
        return {
            status: 500,
            message: error?.message || "Error Detected"
        }
    }
}
const deleteEmpService = async (employeeID) => {
    try {
        const deleteEmp = await Employee.deleteOne({
            employeeID: employeeID
        }
        )
        if (!deleteEmp) {
            return {
                status: 404,
                message: "Employee Not Found to delete"
            }
        }
        return {
            status: 200,
            message: "Employee Data Deleted Succssfully"
        }
    } catch (error) {
        console.error(error?.message || error?.data, "Internal Server Error");
        return {
            status: 500,
            message: "Error Detected"
        }
    }
}
const getEmpService = async () => {
    try {
        const allemp = await Employee.find();
        if (!allemp) {
            return {
                status: 404,
                message: "No Employee Found"
            }
        }
        return {
            status: 200,
            message: "Employee Fetched Succesfully",
            data: allemp
        }
    } catch (error) {
        console.error(error?.message || error, "Internal Server Error");
        return {
            status: 401,
            message: "Oh! Error Detected"
        }
    }

}
module.exports = {
    createEmpService,
    updateEmpService,
    deleteEmpService,
    getEmpService
}