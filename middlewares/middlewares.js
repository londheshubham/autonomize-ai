import { getData, writeData } from "./dataWritingReading.js"

export const getAllEmployees = async (req, res) => {
    try {
        const data = await getData();
        if (data.length > 0)
            return res.send({ success: true, data: data });
        else {
            return res.send({ success: true, data: data });
        }
    } catch {
        res.status(500);
        return res.send({ success: false, message: 'Failed to get data because of some error.' });
    }
};

export const getEmployee = async (req, res) => {
    try {
        const id = +req.params.id;
        const data = await getData();
        if (Number.isNaN(id)) {
            res.status(400);
            return res.send({ success: false, message: 'Invalid id parameter.' });
        }
        if (data.length > 0) {
            const filteredData = data.filter(item => { return item.employeeId === id }) || [];
            if (filteredData.length === 0) {
                res.status(404);
                return res.send({ success: false, message: `Employee with id ${id} not found` });
            } else {
                return res.send({ success: true, data: filteredData });
            }
        }
        else {
            res.status(500);
            return res.send({ success: false, message: 'Failed to get data because of some error.' });
        }
    } catch {
        res.status(500);
        return res.send({ success: false, message: 'Failed to get data because of some error.' });
    }
};

export const createEmployee = async (req, res) => {
    try {
        const { employeeName, salaryAmount, age, email, degreeDetails } = req.body;
        if (!employeeName || !salaryAmount || !age || !email || (degreeDetails?.length === 0 || !degreeDetails)) {
            res.status(400);
            return res.send({ success: false, message: 'Invalid body parameters.' });
        }
        const data = await getData();
        if (data.length > 0) {
            const employeeData = {
                employeeId: data.length + 1,
                employeeName,
                salaryAmount,
                age,
                email,
                degreeDetails
            }
            const id = await writeData([...data, employeeData]);
            if (id) {
                res.status(201)
                return res.send({ success: true, message: `Employee with ${id} added.` });
            } else {
                res.status(500)
                return res.send({ success: false, message: 'Failed to add employee' });
            }
        }
        else {
            const employeeData = {
                employeeId: 1,
                employeeName,
                salaryAmount,
                age,
                email,
                degreeDetails
            }
            const id = await writeData([employeeData]);
            if (id) {
                res.status(201)
                return res.send({ success: true, message: `Employee with ${id} added.` });
            } else {
                res.status(500)
                return res.send({ success: true, message: 'Failed to add employee' });
            }
        }
    } catch (err) {
        res.status(500);
        return res.send({ success: false, message: 'Failed to get data because of some error.' })
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const id = +req.params.id;
        const data = await getData();
        const { employeeName, salaryAmount, age, email, degreeDetails } = req.body;
        if (Number.isNaN(id)) {
            res.status(400);
            return res.send({ success: false, message: 'Invalid id parameter.' });
        }
        if (data.length > 0) {
            const filteredData = data.filter(item => { return item.employeeId === id }) || [];
            console.log(filteredData, 'fff', id);
            if (filteredData.length === 0) {
                res.status(404);
                return res.send({ success: false, message: `Employee with id ${id} not found` });
            } else {
                const updatedData = data.map(item => {
                    if (item.employeeId === id) {
                        return {
                            ...item,
                            employeeName: employeeName,
                            salaryAmount: salaryAmount,
                            age: age,
                            email: email,
                            degreeDetails: degreeDetails
                        }
                    } else {
                        return item;
                    }
                }) || [];
                const result = await writeData(updatedData);
                if (result) {
                    res.status(201)
                    return res.send({ success: true, message: `Employee with ${id} updated.` });
                } else {
                    res.status(500)
                    return res.send({ success: false, message: 'Failed to update employee.' });
                }
            }
        }
        else {
            res.status(500);
            return res.send({ success: false, message: 'Failed to get data because of some error.' });
        }
    } catch (err) {
        console.log(err);
        res.status(500);
        return res.send({ success: false, message: 'Failed to get data because of some error.' });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const id = +req.params.id;
        const data = await getData();
        if (Number.isNaN(id)) {
            res.status(400);
            return res.send({ success: false, message: 'Invalid id parameter.' });
        }
        if (data.length > 0) {
            const filteredData = data.filter(item => { if (item.employeeId !== id) { return true } else { return false } }) || [];
            const empData = data.filter(item => { return item.employeeId === id }) || [];
            if (empData.length === 0) {
                res.status(404);
                return res.send({ success: false, message: `Employee with id ${id} not found` });
            } else {
                const result = await writeData(filteredData);
                if (result) {
                    res.status(201)
                    return res.send({ success: true, message: `Employee with ${id} deleted.` });
                } else {
                    res.status(500)
                    return res.send({ success: false, message: 'Failed to delete employee.' });
                }
            }
        }
        else {
            res.status(500);
            return res.send({ success: false, message: 'Failed to get data because of some error.' });
        }
    } catch {
        res.status(500);
        return res.send({ success: false, message: 'Failed to get data because of some error.' });
    }
};

