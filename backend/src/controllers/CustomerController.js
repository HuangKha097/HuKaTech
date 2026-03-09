const CustomerService = require("../services/CustomerService");

const getAllCustomers = async (req, res) => {
    try {
        const response = await CustomerService.getAllCustomers();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ status: "ERR", message: error.message || error });
    }
};

const searchCustomers = async (req, res) => {
    try {
        const response = await CustomerService.searchCustomers(req.query);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ status: "ERR", message: error.message || error });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        const data = req.body;

        if (!customerId) {
            return res.status(400).json({ status: "ERR", message: "CustomerId is required" });
        }

        const response = await CustomerService.updateCustomer(customerId, data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ status: "ERR", message: error.message || error });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        if (!customerId) {
            return res.status(400).json({ status: "ERR", message: "CustomerId is required" });
        }

        const response = await CustomerService.deleteCustomer(customerId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ status: "ERR", message: error.message || error });
    }
};

module.exports = {
    getAllCustomers,
    searchCustomers,
    updateCustomer,
    deleteCustomer
};