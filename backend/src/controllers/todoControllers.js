const { sqlDB } = require("../../db");

const getTodos = (req, res) => {
  sqlDB
    .query("select * from todos")
    .then(([result]) => {
      console.warn(result);
      res.status(200).json({ result });
    })
    .catch((err) => {
      console.warn("err:", err);
      res.status(500).send(`Erreur dans la requête getTodos: ${err}`);
    });
};

const postTodos = (req, res) => {
  const { description } = req.body;
  sqlDB
    .query("INSERT INTO todos (description) VALUES (?)", [description])
    .then(([result]) => {
      res.status(201).json({ id: result.insertId });
    })
    .catch((err) => {
      res.status(500).send(`Error in postTodos ${err}`);
    });
};

const deleteTodos = (req, res) => {
  // let { id } = req.body;
  let { id } = req.params;
  id = parseInt(id, 10);

  sqlDB
    .query("DELETE FROM todos WHERE id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res
          .status(404)
          .json({ message: `task was not found in DB because wrong id` });
      } else {
        res.status(201).json({ message: `task ${id} was deleted` });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `task ${id} was not deleted because of error, ${err}`,
      });
    });
};

const updateTodos = (req, res) => {
  let { id } = req.params;
  id = parseInt(id, 10);
  const { description } = req.body;
  sqlDB
    .query("UPDATE todos SET description = ? where id = ?", [description, id])
    .then(() => {
      res.status(201).json({ message: `task ${id} was updated` });
    })
    .catch((err) => {
      res.status(500).json({
        message: `task ${id} was not updated because : ${err}`,
      });
    });
};

module.exports = {
  getTodos,
  postTodos,
  updateTodos,
  deleteTodos,
};
