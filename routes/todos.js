const { Router } = require('express');
const { check } = require('express-validator');

const {
    getAllTodos,
    saveTodo,
    getTodo,
    updateTodo,
    updateStatus,
    deleteTodo
} = require('./../controllers/todos');

const { validFields } = require('./../middleware/valid-fields');

const router = Router();

router.get(
    '/',
    getAllTodos
)

router.get(
    '/:id',
    getTodo
)

router.post(
    '/',
    [
        check('name', 'Name is required.').not().isEmpty(),
        check('title', 'Title is required.').not().isEmpty(),
        validFields
    ],
    saveTodo
)

router.put(
    '/:id',
    updateTodo
)

router.patch(
    '/:id',
    [
        check('name', 'Name is required.').not().isEmpty(),
        check('title', 'Title is required.').not().isEmpty(),
        validFields
    ],
    updateStatus
)

router.delete(
    '/:id',
    deleteTodo
)

module.exports = router;