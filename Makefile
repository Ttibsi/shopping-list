.PHONY: back
back:
	rm db.db
	sqlite3 db.db < schema.sql
	venv/bin/python3 main.py
