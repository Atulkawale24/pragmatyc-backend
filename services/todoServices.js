const todo = require("../models/todo/todoModel");
const { ObjectId } = require("mongodb");
const limit = Number(process.env.LIMIT) ?? 10  //number of documents have to show per page

//count the number of pages for pagination
async function countPages(totalDocuments = 0) {
    return Math.ceil(totalDocuments / limit)
};


const todoServices = {
    addTodoItem: async (dataToInsert) => {
        try {
            return await todo.create(dataToInsert);
        } catch (error) {
            throw error;
        }
    },
    todoList: async ({ searchString, page = 1, startDate, endDate, status = "", userId }) => {
        try {
            let filter = {
                author: new ObjectId(userId)
            };

            if (searchString) {
                filter["$or"] = [
                    { 'name': { "$regex": searchString, '$options': "i" } },
                    { 'description': { "$regex": searchString, '$options': "i" } },
                    { 'status': { "$regex": searchString, '$options': "i" } }
                ]
            }

            if (status) {
                filter["status"] = { $regex: new RegExp(status, "i") };
            }
            if (startDate && endDate) {
                const startTime = new Date(startDate)
                const endTime = new Date(endDate)
                filter = {
                    ...filter,
                    createdAt: {
                        $gte: new Date(startTime.setHours(0, 0, 1, 0)),
                        $lte: new Date(endTime.setHours(23, 59, 0, 0))
                    }
                }
            }
            const totalRecords = await todo.countDocuments(filter);
            const data = await todo.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
            return {
                totalPages: await countPages(totalRecords),
                data
            }
        } catch (error) {
            throw error;
        }
    },
    updateTodoItem: async (id, dataToUpdate) => {
        try {
            return await todo?.updateOne(
                { _id: new ObjectId(id) },
                { $set: dataToUpdate }
            );
        } catch (error) {
            throw error;
        }
    },
    getTodoDetailById: async (id) => {
        try {
            return await todo?.findOne({ _id: new ObjectId(id) });
        } catch (error) {
            throw error;
        }
    },
};
module.exports = todoServices;
