"""Forms for playlist app."""

from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, IntegerField, RadioField, SelectField, TextAreaField
from wtforms.validators import InputRequired, URL, Optional, NumberRange


class PlaylistForm(FlaskForm):
    """Form for adding playlists."""

    name = StringField("Playlist Name", validators=[InputRequired()])
    description = TextAreaField("Description", validators=[Optional()])


class SongForm(FlaskForm):
    """Form for adding songs."""

    title = StringField("Song Title", validators=[InputRequired()])
    artist = StringField("Artist", validators=[InputRequired()])


class NewSongForPlaylistForm(FlaskForm):
    """Form for adding a song to playlist."""

    song = SelectField('Song To Add', coerce=int)
