import json
import sqlite3
from typing import TypeAlias

import flask

app = flask.Flask(__name__)
JSON: TypeAlias = (
    dict[str, "JSON"] | list["JSON"] | str | int | float | bool | None
)


@app.route("/")
def hello_world() -> str:
    return "<p>Hello, World!</p>"


@app.route("/getEntries")
def get_entries() -> JSON:
    cursor = sqlite3.connect("db.db").cursor()
    cursor.execute("SELECT * FROM entries;")
    cols = [col[0] for col in cursor.description]

    ret = []
    for value in cursor.fetchall():
        ret.append(dict(zip(cols, value)))

    json_ret = json.dumps(ret)
    return json_ret


@app.route("/insert", methods=["POST"])
def insert_item() -> None:
    new = flask.request.json.get("entry")

    conn = sqlite3.connect("db.db")
    cur = conn.cursor()
    cur.execute(f'INSERT INTO entries VALUES (NULL, "{new}", FALSE);')
    conn.commit()
    conn.close()


@app.route("/complete", methods=["PUT"])
def mark_complete():
    update_id = flask.request.json.get("entry_id")

    conn = sqlite3.connect("db.db")
    cur = conn.cursor()
    cur.execute(f"UPDATE entries SET completed = TRUE WHERE id = {update_id}")
    conn.commit()
    conn.close()

    return 0


@app.route("/incomplete", methods=["PUT"])
def mark_incomplete():
    update_id = flask.request.json.get("entry_id")

    conn = sqlite3.connect("db.db")
    cur = conn.cursor()
    cur.execute(f"UPDATE entries SET completed = FALSE WHERE id = {update_id}")
    conn.commit()
    conn.close()

    return 0


if __name__ == "__main__":
    app.run(port=8888)
