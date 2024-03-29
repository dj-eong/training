from flask import Flask, request, render_template,  redirect, flash, session, url_for, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet
from forms import AddPetForm, EditPetForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pets_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "chickenzarecool21837"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()


@app.route('/')
def home_page():
    """Render home page"""
    pets = Pet.query.all()
    return render_template('index.html', pets=pets)


@app.route('/add', methods=['GET', 'POST'])
def add_pet():
    form = AddPetForm()

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data if form.photo_url.data else None
        age = form.age.data if form.age.data else None
        notes = form.notes.data if form.notes.data else None

        pet = Pet(name=name, species=species,
                  photo_url=photo_url, age=age, notes=notes)
        db.session.add(pet)
        db.session.commit()

        flash(f"Added new pet:{name} the {species}")
        return redirect('/')
    else:
        return render_template('add-pet-form.html', form=form)


@app.route('/<int:pet_id>', methods=['GET', 'POST'])
def display_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)

    if form.validate_on_submit():
        pet.photo_url = form.photo_url.data if form.photo_url.data else 'https://mylostpetalert.com/wp-content/themes/mlpa-child/images/nophoto.gif'
        pet.notes = form.notes.data
        pet.available = form.available.data
        db.session.commit()
        return redirect(url_for('home_page'))
    else:
        return render_template('display-pet.html', pet=pet, form=form)



