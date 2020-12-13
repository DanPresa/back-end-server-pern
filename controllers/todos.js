const { response } = require('express');

const pool = require('./../db/config');

/* GET ALL TODOS */
const getAllTodos = async (req, res = response) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todos ORDER BY id DESC');

        res.status(200).json({
            ok: true,
            todos: allTodos.rows
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong.'
        });
    }
}
/* END GET ALL TODOS */

/* SAVE TODO */
const saveTodo = async ( req, res = response ) => {
    const { name, title } = req.body;

    try {
        const newTodo = await pool.query("INSERT INTO todos(name, title) VALUES($1, $2) RETURNING *", [name, title])

        res.status(200).json({
            ok: true,
            msg: "Todo created successfully",
            todo: newTodo.rows[0]
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong.'
        });
    }
}
/* SAVE TODO */

/* GET TODO BY ID */
const getTodo = async ( req, res = response ) => {
    const { id } = req.params;

    try {
        const todo = await pool.query("SELECT * FROM todos WHERE id = $1", [id])

        res.status(200).json({
            ok: true,
            todo: todo.rows[0]
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong.'
        });
    }
}
/* GET TODO BY ID */

/* UPDATE TODO BY ID */
const updateTodo = async ( req, res = response ) => {
    const { id } = req.params;

    try {
        const { name, title, completed } = req.body;

        const todo = await pool.query("UPDATE todos SET name = $1, title = $2, completed = $3 WHERE id = $4 RETURNING *", [name, title, completed, id]);

        res.status(200).json({
            ok: true,
            msg: `Updated successfully.`,
            todo: todo.rows[0]
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong.'
        });
    }
}
/* UPDATE TODO BY ID */

/* UPDATE STATUS TODO */
const updateStatus = async ( req, res = response ) => {
    const { id } = req.params;

    try {
        const { completed } = req.body;
        const todo = await pool.query("UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *", [!completed, id]);

        res.status(200).json({
            ok: true,
            msg: `Status updated successfully`,
            todo: todo.rows[0]
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong.'
        });
    }
}
/* UPDATE STATUS TODO */

/* DELTE TODO BY ID */
const deleteTodo = async (req, res = reponse) => {
    const { id } = req.params;

    try {
        await pool.query("DELETE FROM todos WHERE id = $1", [id]);

        res.status(200).json({
            ok: true,
            msg: 'Todo deleted'
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong.'
        });
    }
}
/* DELTE TODO BY ID */

module.exports = {
    getAllTodos,
    saveTodo,
    getTodo,
    updateTodo,
    updateStatus,
    deleteTodo
}