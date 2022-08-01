const { IncomingForm } = require('formidable');

const Form = new IncomingForm({
  keepExtensions: true,
  filename: 'randomBytes',
  uploadDir: __dirname + '/../client/public/uploads',
  maxFileSize: 100 * 1024 * 1024,
  allowEmptyFiles: true,
  filter: ({ name, originalFilename, mimetype }) => {
    const supportedFormat = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
    ];
    if (!supportedFormat.includes(mimetype)) {
      throw new Error(`${mimetype} is not supported`);
    }
    return true;
  },
});

exports.createTodo = query => {
  return async (req, res, next) => {
    try {
      Form.parse(req, async (err, fields, files) => {
        if (err) {
          next(err);
          return;
        }
        const imageUri = files.image ? files.image.newFilename : '';
        const { userId, title, description, dueDate } = fields;
        await query(
          `INSERT INTO todolist (userId,title,description,imageUri,dueDate) values (${userId},"${title}","${description}","${imageUri}","${dueDate}")`
        );
        res.status(201).json({
          status: 'success',
          message: 'uploaded successfully',
        });
      });
    } catch (err) {
      next(err);
    }
  };
};

exports.getAllTodos = query => {
  return async (req, res, next) => {
    try {
      const { userid } = req.user;
      const datas = await query(
        `SELECT * from todolist where todolist.userId=${userid}`
      );

      res.status(200).json({
        status: 'success',
        todos: datas,
      });
    } catch (err) {
      next(err);
    }
  };
};

exports.deleteTodos = query => {
  return async (req, res, next) => {
    try {
      const { todoId } = req.params;
      await query(
        `Delete from todolist where userId=${req.user.userid} AND todoId=${todoId}`
      );
      res.status(202).json({
        status: 'success',
        message: `${todoId} deleted successfully`,
      });
    } catch (err) {
      next(err);
    }
  };
};

exports.updateTodo = query => {
  return async (req, res, next) => {
    try {
      const { todoId, stats } = req.body;
      await query(
        `UPDATE todolist SET status="${stats}" where userId=${req.user.userid} and todoId=${todoId}`
      );
      res.send({
        status: 'success',
        message: `status updated to ${stats}`,
      });
    } catch (err) {
      next();
    }
  };
};
