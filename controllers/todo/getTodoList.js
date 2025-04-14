const todoServices = require("../../services/todoServices");

const getTodoList = async (req, res) => {
    try {
        const userId = req._id
        const { searchString, page, startDate, endDate, status } = req.body;

        const result = await todoServices.todoList({ searchString, page, startDate, endDate, status, userId });
        if (result?.totalPages) {
            res.status(200).json({
                status: "SUCCESS",
                message: "Todo list fetched successfully",
                ...result
            });
            return;
        } else {
            res.status(200).json({
                status: "FAILED",
                message: "Failed to fetch todo list!",
            });
            return;
        }
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error?.message,
        });
    }
};
module.exports = getTodoList;
