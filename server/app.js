const express = require('express');
const userRoute = require('./routes/userRoutes');
const app = express();

app.use(express.json());
app.use('/api', userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
