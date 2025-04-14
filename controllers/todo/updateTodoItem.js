const todoServices = require("../../services/todoServices");
const { updateTodoValidation } = require("../../validations/todo/updateTodoValidation");

const updateTodoItem = async (req, res) => {
    try {
        const userId = req?._id
        const { id, name, description, status } = req.body;
        const validationResult = await updateTodoValidation.validate(
            { id, name, description, status },
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
            name,
            description,
            status: "New",
            author: userId
        };
        const result = await todoServices.updateTodoItem(id, dataToUpdate);
        if (result?.acknowledged && result?.modifiedCount > 0) {
            res.status(200).json({
                status: "SUCCESS",
                message: "Todo updated successfully",
            });
            return;
        } else {
            res.status(200).json({
                status: "FAILED",
                message: "Failed to update todo",
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error?.message,
        });
    }
};
module.exports = updateTodoItem;
