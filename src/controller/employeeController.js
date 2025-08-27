const serviceFile = require("../service/employeeService");

const createUser = async (req, res) => {
    const resp = await serviceFile.createUserService(req.body);
    res.send(resp);
}
const updateUser = async (req, res) => {
    const resp = await serviceFile.updateUserService(req.params, req.body)
    res.send(resp);
}

const deletUser = async (req, res) => {
    const { employeeId } = req.params;
    const resp = await serviceFile.deleteUserService(employeeId)
    res.send(resp)
}
const getUsers = async (req, res) => {
    const resp = await serviceFile.getUsersService();
    res.send(resp);
}

module.exports = {
    createUser,
    updateUser,
    deletUser,
    getUsers
}