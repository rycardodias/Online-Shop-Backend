const app = require('./app')

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server started on port http://127.0.0.1:${PORT}${process.env.BASEPATH}`))

