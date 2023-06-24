CREATE TABLE entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value TEXT NOT NULL,
    completed BOOLEAN
);

INSERT INTO entries VALUES (NULL, "myentry", FALSE), (NULL, "done", TRUE);
