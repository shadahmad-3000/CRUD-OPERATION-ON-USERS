const { default: status } = require("http-status");
const User = require("../models/user.model");


//register user
const createUserService = async (body) => {
    try {
        const { name, email, mobileNo, employeeID, designation, joiningDate } = body;
        if (!name || !email || !mobileNo || !employeeID || !designation || !joiningDate) {
            throw new Error("All parameters must be provided");
        }
        const createUser = {
            name,
            email,
            mobileNo,
            employeeID,
            designation,
            joiningDate
        };
        const currUser = await User.create(createUser);
        console.log("User Registered", currUser);
        return {
            status: 200,
            message: "User registered Successfully",
            data: currUser
        }
    } catch (error) {
        console.error(error?.message || error?.data || error, "Internal Server Error");
        return {
            status: 500,
            message: "Oop's Error Detected"
        }
    }
}
const updateUserService = async (param, body) => {
    try {
        const { employeeID } = param;
        const { updateData } = body;

        const updateUser = await User.findOneAndUpdate(
            { employeeID: employeeID },
            { $set: updateData },
            { new: true }
        )
        if (!updateUser) {
            return {
                status: 404,
                message: "User Not Found",
            }
        }
        return {
            status: 200,
            message: "User Updated Successfully",
            data: updateUser
        }
    } catch (error) {
        console.error(error?.message || error, "Internal Servern error");
        return {
            status: 500,
            message: error?.message || "Error Detected"
        }
    }
}
const deleteUserService = async (employeeID) => {
    try {
        const deleteUser = await User.deleteOne({
            employeeID: employeeID
        }
        )
        if (!deleteUser) {
            return {
                status: 404,
                message: "User Not Found to delete"
            }
        }
        return {
            status: 200,
            message: "User Deleted Succssfully"
        }
    } catch (error) {
        console.error(error?.message || error?.data, "Internal Server Error");
        return {
            status: 500,
            message: "Error Detected"
        }
    }
}
const getUsersService = async () => {
    try {
        const allusers = await User.find();
        if (!allusers) {
            return {
                status: 404,
                message: "No Users Found"
            }
        }
        return {
            status: 200,
            message: "User Fetched Succesfully",
            data: allusers
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
    createUserService,
    updateUserService,
    deleteUserService,
    getUsersService
}