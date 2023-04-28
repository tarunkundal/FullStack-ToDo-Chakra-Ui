const pool = require("../db/connection");

// new todo
const newTodo = async (req, res, next) => {
  try {
    const { title, user_email, created_at, duedate, completed, description } =
      req.body;

    if (!title || !user_email || !created_at) {
      return res.status(204).json("Please enter all fields");
    }

    await pool.query(
      `INSERT INTO todos (title,user_email,created_at,duedate,completed,description) VALUES ($1,$2,$3,$4,$5,$6) ;`,
      [title, user_email, created_at, duedate, completed, description]
    );

    res.status(201).json("Added todo sucessfully!");
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// get todos by user_email
const allTodos = async (req, res) => {
  try {
    const { user_email } = req.params;

    const todos = await pool.query(`SELECT * FROM todos WHERE user_email=$1`, [
      user_email,
    ]);

    if (todos.rowCount !== 0) {
      return res.json(todos.rows);
    } else {
      return res.json([]);
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// update
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, updated_at, duedate, description } = req.body;

    const updatedTodo = await pool.query(
      `UPDATE todos SET title=$1,updated_at=$2,duedate=$3,description=$4 WHERE id=$5 `,
      [title, updated_at, duedate, description, id]
    );

    if (updatedTodo.rowCount !== 0) {
      return res.status(202).json("Task Updated Sucessfully!");
    } else {
      return res.status(400).json("Failed to update selected Todo!");
    }
  } catch (error) {
    res.json(error);
  }
};

// update the status of task
const updateTodoStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const updatedTodoStatus = await pool.query(
      `UPDATE todos SET completed=$1 WHERE id=$2 `,
      [completed, id]
    );

    if (updatedTodoStatus.rowCount !== 0) {
      return res.status(202).json("Task Status Updated Sucessfully!");
    } else {
      return res.status(400).json("Failed to update task status!");
    }
  } catch (error) {
    res.json(error);
  }
};

// detete
const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedTodo = await pool.query(`DELETE FROM todos WHERE id=$1`, [id]);

    if (deletedTodo.rowCount !== 0) {
      return res.status(200).json("Deleted Todo Sucessfully!");
    } else {
      return res.status(400).json("Failed to delete selected Todo.");
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  newTodo,
  allTodos,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
};
