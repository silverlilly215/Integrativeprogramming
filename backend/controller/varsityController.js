const db = require('../db'); // Import the MySQL connection
const path = require('path');
const fs = require('fs');

const submitVarsityApplication = (req, res) => {
    try {
        const { name, course, year_level, contact } = req.body;
        const documents = req.files; // Multer parses uploaded files

        // Validate required fields
        if (!name || !course || !year_level || !contact || !documents || documents.length === 0) {
            return res.status(400).json({ message: "All fields are required, including documents." });
        }

        // Save documents to a specific folder
        const savedFiles = documents.map((file) => {
            const filePath = path.join(__dirname, '../uploads/documents', file.originalname);
            fs.writeFileSync(filePath, file.buffer); // Write the file to the server
            return filePath;
        });

        // Insert data into the database
        const query = `
            INSERT INTO varsity (name, course, year_level, contact_number, documents)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [name, course, year_level, contact, savedFiles.join(', ')];

        db.query(query, values, (err) => {
            if (err) {
                console.error("Database Error:", err);
                return res.status(500).json({ message: "Failed to save application to the database." });
            }

            res.status(201).json({
                message: "Application submitted successfully!",
                data: {
                    name,
                    course,
                    year_level,
                    contact,
                    documents: savedFiles,
                },
            });
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "An error occurred while processing the application." });
    }
};


module.exports = { submitVarsityApplication };
