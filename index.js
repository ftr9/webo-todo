const app = require('./app');

const PORT = 4050 || process.env.PORT;
app.listen(PORT, () => console.log(`server has been started on PORT ${PORT}`));
