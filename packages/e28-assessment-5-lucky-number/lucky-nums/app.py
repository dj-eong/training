from flask import Flask, render_template, request, jsonify
import requests
import random

API_BASE_URL = "http://numbersapi.com"

app = Flask(__name__)


@app.route("/")
def homepage():
    """Show homepage."""

    return render_template("index.html")


def check_for_errors(name, email, year, color):
    return (not name or not email or
            not year or year > 2000 or year < 1900 or
            (color != 'red' and color != 'orange' and
             color != 'green' and color != 'blue'))


def return_error_json(name, email, year, color):
    errors = {"errors": {}}
    if not name:
        errors["errors"]["name"] = "This field is required"
    if not email:
        errors["errors"]["email"] = "This field is required"
    if (color != 'red' and color != 'orange' and
            color != 'green' and color != 'blue'):
        errors["errors"]["color"] = 'Invalid value, must be one of: '\
            'red, green, orange, blue.'
    if (not year or year > 2000 or year < 1900):
        errors["errors"]["year"] = 'Invalid value, must be a number '\
            'between 1900 & 2000.'
    return jsonify(errors)


@app.route("/api/get-lucky-num", methods=["POST"])
def get_lucky_num():
    name = request.json['name']
    email = request.json['email']
    year = (int(request.json['year']) if request.json['year'].isnumeric()
            else '')
    color = request.json['color']

    if check_for_errors(name, email, year, color):
        return return_error_json(name, email, year, color)

    num = random.randrange(1, 101)
    num_fact = requests.get(f"{API_BASE_URL}/{num}").text
    year_fact = requests.get(f"{API_BASE_URL}/{year}/year").text
    data = {"num": {"fact": num_fact, "num": num},
            "year": {"fact": year_fact, "year": year}}
    return jsonify(data)
