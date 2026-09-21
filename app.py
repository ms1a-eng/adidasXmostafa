from flask import Flask, request, jsonify
import sqlite3
import time

last_ping = 0 #defining a global varuable

app = Flask(__name__)

@app.route("/api/save", methods=["POST", "OPTIONS"])
def save(): 
    global last_ping
    last_ping = time.time() #saving the time where save got called

    if request.method == "OPTIONS":
        return ("", 204)
    
    currenttab = request.get_json(silent=True) #kept silent to avoid crash. The global request variable contains the json of the extension 
    key = request.headers.get("API-KEY")
    if key != "adiXm05": 
        return "unauthorized acsses.", 401
    database = sqlite3.connect("data.db")
    cursor = database.cursor(); 

    cursor.execute(
        """CREATE TABLE IF NOT EXISTS focustable
        (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, time INTEGER)
        """
    )


    if "ocw" in currenttab["url"] or "ombplus" in currenttab["url"]: 
        name = "math"
    elif "cs50" in currenttab["url"]: 
        name = "cs50"
    else:
        name = currenttab["title"]
     
    cursor.execute(
        "INSERT INTO focustable (name, time) VALUES (?, ?)", (name, 1)
    )


    database.commit()
    database.close()

    return jsonify({"status": "saved", "code": 200})


@app.route("/api/get")
def get():
    search = request.args.get("name")

    database = sqlite3.connect("data.db")
    cursor = database.cursor()

    if search:
        cursor.execute("SELECT SUM(time) FROM focustable WHERE name = (?)", (search,))  #comma to remind python thats not just a word 
    else: 
        cursor.execute("SELECT SUM(time) FROM focustable")
    
    result = cursor.fetchone()
    result = result[0]

    cursor.execute(
           "SELECT name FROM focustable ORDER BY id DESC LIMIT 1"
        )
    name = cursor.fetchone()
    name = name[0] if name else "Standby"
    
    database.close()
    diff = time.time() - last_ping #looking how much time has passed since the last call
    is_online = (diff < 120) #if less than 2 min returns a true or false.

    if not is_online: 
        name = "Standby"

    return jsonify({"name": name ,"minutes": result, "is_online": is_online})


@app.after_request
def allow(response):
    response.headers["Access-Control-Allow-Origin"] = "*" #allowing requests from anyone even if its a chrome extension
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, API-KEY" #the sender is allowed to send this header
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    return response

if __name__ == "__main__":  
    app.run(port = 5001 , debug=True)

   