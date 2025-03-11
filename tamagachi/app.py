# app.py
from flask import Flask, request, jsonify
from modules.tamagachi_logic import Tamagachi
import threading, time

app = Flask(__name__)

# Global pet instance (for simplicity—only one pet exists)
pet = None

def game_loop():
    """Continuously update the pet's state every 2 seconds."""
    global pet
    while pet and pet.alive:
        time.sleep(2)
        pet.tick()

@app.route('/create', methods=['POST'])
def create():
    global pet
    data = request.get_json()
    name = data.get("name")
    if not name:
        return jsonify({"error": "Name required"}), 400

    pet = Tamagachi(name)
    # Start the background game loop in a daemon thread
    threading.Thread(target=game_loop, daemon=True).start()
    return jsonify({"message": f"{name} was born!", "status": pet.get_status()})

@app.route('/feed', methods=['POST'])
def feed():
    if not pet:
        return jsonify({"error": "No pet exists"}), 400
    result = pet.feed()
    return jsonify({"message": result, "status": pet.get_status()})

@app.route('/play', methods=['POST'])
def play():
    if not pet:
        return jsonify({"error": "No pet exists"}), 400
    result = pet.play()
    return jsonify({"message": result, "status": pet.get_status()})

@app.route('/medicine', methods=['POST'])
def medicine():
    if not pet:
        return jsonify({"error": "No pet exists"}), 400
    result = pet.give_medicine()
    return jsonify({"message": result, "status": pet.get_status()})

@app.route('/status', methods=['GET'])
def status():
    if not pet:
        return jsonify({"error": "No pet exists"}), 400
    return jsonify({"status": pet.get_status()})

if __name__ == '__main__':
    # Run the app on 0.0.0.0 so it’s accessible from outside the container.
    app.run(host='0.0.0.0', port=5000)
