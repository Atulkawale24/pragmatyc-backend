const todoServices = require("../../services/todoServices");
const { todoStatusValidation } = require("../../validations/todo/changeTodoStatusValidation");

const changeTodoStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        const validationResult = await todoStatusValidation.validate(
            { id, status },
            { abortEarly: true }
        );
        if (validationResult?.error) {
            res.status(200).json({
                status: "VALIDATION FAILED",
                message: validationResult?.error?.details[0]?.message,
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
        const dataToUpdate = {
            status: status
        };
        const result = await todoServices.updateTodoItem(id, dataToUpdate);
        if (result?.acknowledged && result?.modifiedCount > 0) {
            res.status(200).json({
                status: "SUCCESS",
                message: "Todo status updated successfully",
            });
            return;
        } else {
            res.status(200).json({
                status: "FAILED",
                message: "Failed to update todo status",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "FAILED",
            message: error?.message,
        });
    }
};
module.exports = changeTodoStatus;
