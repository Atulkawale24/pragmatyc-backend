const todoServices = require("../../services/todoServices");
const { todoValidation } = require("../../validations/todo/todoValidation");


const addTodo = async (req, res) => {
    try {
        const userId = req?._id
        const { name, description } = req.body;
        const validationResult = await todoValidation.validate(
            { name, description },
            { abortEarly: true }
        );
        if (validationResult?.error) {
            res.status(200).json({
                status: "VALIDATION FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
            return;
        }
        const dataToInsert = {
            name,
            description,
            status: "New",
            author: userId
        };
        const result = await todoServices.addTodoItem(dataToInsert);
        if (result) {
            res.status(200).json({
                status: "SUCCESS",
                message: "Todo Item added successfully",
            });
            return;
        } else {
            res.status(200).json({
                status: "FAILED",
                message: "Failed to add Todo Item!",
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
module.exports = addTodo;
