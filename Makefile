.PHONY:setup
setup: setup-client setup-server
	echo "setup complete"

setup-client:
	cd client; npm i && npx tsc

setup-server:
	cd server; virtualenv venv && venv/bin/pip install flask flask_cors pre-commit
	sqlite3 server/db.db < server/schema.sql

.PHONY: clean
clean:
	rm -rf server/db.db \
		server/venv \
		client/dest/*

.PHONY: server
server:
	server/venv/bin/python3 server/main.py

.PHONY: client
client:
	cd client; python3 -m http.server

.PHONY: pc
pc:
	server/venv/bin/pre-commit run --all-files
