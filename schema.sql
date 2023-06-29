CREATE TABLE entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value TEXT NOT NULL,
    completed BOOLEAN
);

INSERT INTO entries VALUES (NULL, "First", FALSE), (NULL, "Completed", TRUE), (NULL, "Click me to delete", FALSE);
