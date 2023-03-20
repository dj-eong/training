from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, IntegerField, RadioField, SelectField, TextAreaField
from wtforms.validators import InputRequired, URL, Optional, NumberRange

valid_species = ['cat', 'dog', 'porcupine']


class AddPetForm(FlaskForm):
    name = StringField("Pet Name",  validators=[InputRequired()])
    species = SelectField("Species", validators=[InputRequired()], choices=[
                          (species, species) for species in valid_species])
    photo_url = StringField("Photo URL", validators=[Optional(), URL()])
    age = IntegerField("Age", validators=[
                       Optional(), NumberRange(min=0, max=30)])
    notes = TextAreaField("Notes", validators=[Optional()])


class EditPetForm(FlaskForm):
    photo_url = StringField("Photo URL", validators=[Optional(), URL()])
    notes = TextAreaField("Notes", validators=[Optional()])
    available = BooleanField("Available")
