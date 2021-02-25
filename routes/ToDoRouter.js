const { getToDos, addnewToDo, deleteToDo,editToDo } = require('../controllers/ToDoController');

const express = require('express');
const { chechkSign } = require('../middlewares/checkSign');
const router = express.Router();



/* GET todeos. */
router.get('/',  getToDos);

/* Add todeo. */

router.post('/',addnewToDo);


/* Add todeo. */

router.delete('/:id',deleteToDo);
/* Edit todeo. */

router.post('/edit',editToDo);

module.exports = router;
