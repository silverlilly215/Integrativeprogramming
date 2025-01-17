const express = require('express');
const cors = require('cors');
const db = require('./db'); 
const registrationRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes'); 
const manageAccountRoutes = require('./routes/manageaccountRoutes');
const asolcformRoutes = require('./routes/asolcformRoutes'); 
const manageApplicationRoutes = require('./routes/manageapplicationRoutes');
const viewapplicationRoutes = require("./routes/viewapplicationRoutes"); 
const siblingsformRoutes = require('./routes/siblingsformRoutes');
const academicRoutes = require('./routes/academicRoutes');
const varsityRoutes = require('./routes/varsityRoutes');
const displaynotifRoutes = require('./routes/displaynotifRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json());

// Use the registration and login routes
app.use('/api/registration', registrationRoutes);
app.use('/api/login', loginRoutes); 
app.use('/api/manage-account', manageAccountRoutes);
app.use('/api/asolcform', asolcformRoutes);
app.use('/api/manage-application', manageApplicationRoutes);
app.use("/api/applications", viewapplicationRoutes);
app.use('/api/siblings', siblingsformRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/academic', academicRoutes.router); // Ensure to use the router here
app.use('/api/varsity', varsityRoutes);
app.use('/api', displaynotifRoutes);

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
    process.exit(1); 
  }
  console.log('Connected to the MySQL database');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
