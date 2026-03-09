const ReportService = require("../services/ReportService");

const getSalesReport = async (req, res) => {
    try {
        const { timeRange } = req.query; // '7days', '30days', 'year'

        const response = await ReportService.getSalesReport(timeRange || '7days');
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: "ERR",
            message: error.message || error,
        });
    }
};

module.exports = {
    getSalesReport
};