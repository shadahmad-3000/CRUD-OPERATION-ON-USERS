const serviceFile = require("../service/employeeService");

const createEmp = async (req, res) => {
    const resp = await serviceFile.createEmpService(req.body);
    res.send(resp);
}
const updateEmp = async (req, res) => {
    const resp = await serviceFile.updateEmpService(req.params, req.body)
    res.send(resp);
}

const deleteEmp = async (req, res) => {
    const { employeeId } = req.params;
    const resp = await serviceFile.deleteEmpService(employeeId)
    res.send(resp)
}
const getEmps = async (req, res) => {
    try {
        const resp = await serviceFile.getEmpService();
        res.send(resp);
    } catch (error) {
        console.error(error?.message || error?.data,"Error!!!");
    }
}

module.exports = {
    createEmp,
    updateEmp,
    deleteEmp,
    getEmps
}