const todoServices = require("../../services/todoServices");
const { updateTodoValidation } = require("../../validations/todo/updateTodoValidation");

const getTodoDetailsById = async (req, res) => {
    try {
        const { id } = req.body;
        if ([undefined, null, ""]?.includes(id)) {
            res.status(200).json({
                status: "VALIDATION FAILED",
                message: "ID is required",
            });
            return;
        }
        //check is todo id exist or not
        const isTodoExist = await todoServices.getTodoDetailById(id);
        if (!isTodoExist) {
            res.status(200).json({
                status: "FAILED",
                message: "Todo item is not exist!",
            });
            return;
        }

        if (isTodoExist) {
            res.status(200).json({
                status: "SUCCESS",
                message: "Todo detail fetched successfully",
                todoDetail: isTodoExist,
            });
            return;
        } else {
            res.status(200).json({
                status: "FAILED",
                message: "Failed to fetch todo detail",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "FAILED",
            message: error?.message,
        });
    }
};
module.exports = getTodoDetailsById;
