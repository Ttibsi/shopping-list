import json
import sqlite3
from typing import Any

import flask
import flask_cors

app = flask.Flask(__name__)
cors = flask_cors.CORS(
    app, resources={r"/*": {"origins": "http://localhost:*"}}
)


@app.route("/")
def hello_world() -> str:
    return "<p>Hello, World!</p>"


# curl localhost:8888/getEntries
@app.route("/getEntries")
def get_entries() -> flask.Response:
    cursor = sqlite3.connect("db.db").cursor()
    cursor.execute("SELECT * FROM entries;")
    cols = [col[0] for col in cursor.description]

    ret: dict[str, Any] = {"values": []}
    for value in cursor.fetchall():
        ret["values"].append(dict(zip(cols, value)))

    resp = flask.Response(json.dumps(ret), status=201)
    resp.headers["Access-Control-Allow-Origin"] = "*"
    return resp


# curl -X POST "localhost:8888/insert?entry=new"
@app.route("/insert", methods=["POST"])
def insert_item() -> flask.Response:
    new: str = flask.request.get_json(True)["new_entry"]

    conn = sqlite3.connect("db.db")
    cur = conn.cursor()
    cur.execute(f'INSERT INTO entries VALUES (NULL, "{new}", FALSE);')
    conn.commit()
    conn.close()

    return flask.Response(status=201)


# curl -X PUT "localhost:8888/complete?entry_id=3"
@app.route("/complete", methods=["PUT"])
def mark_complete() -> flask.Response:
    update_id = flask.request.args["entry_id"]

    conn = sqlite3.connect("db.db")
    cur = conn.cursor()
    cur.execute(f"UPDATE entries SET completed = TRUE WHERE id = {update_id}")
    conn.commit()
    conn.close()

    return flask.Response(status=201)


# curl -X PUT "localhost:8888/incomplete?entry_id=3"
@app.route("/incomplete", methods=["PUT"])
def mark_incomplete() -> flask.Response:
    update_id = flask.request.args["entry_id"]

    conn = sqlite3.connect("db.db")
    cur = conn.cursor()
    cur.execute(f"UPDATE entries SET completed = FALSE WHERE id = {update_id}")
    conn.commit()
    conn.close()

    return flask.Response(status=201)


if __name__ == "__main__":
    app.run(port=8888)
