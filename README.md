# todo-list
A web application todo list app - I'm using this to gain some experience
with Flask and to learn typescript.

### TO Run:
Generate the database:

```bash
sqlite3 db.db < schema.sql
```

In one terminal window, launch the backend server with:

``` bash
python3 -m virtualenv venv &&
venv/bin/pip install flask flask_cors &&
venv/bin/python3 main.py
```

You can then compile and start the frontend with (assuming you use firefox --
change based off your browser of choice) :

``` bash
npx i &&
npx tsc &&
firefox index.html
```
