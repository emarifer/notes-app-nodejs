const mongoose = require('mongoose');

// Database connection
mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('Connected database'))
    .catch(e => console.error('Error DB', e));
