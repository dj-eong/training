from flask import Flask, render_template, redirect, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User
from forms import RegisterForm, LoginForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pair_programming'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

app.config['SECRET_KEY'] = 'abc123'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)


@app.route('/')
def home_page():
    if 'username' in session:
        users = User.query.all()
        return render_template('home.html', users=users)
    return redirect('/register')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if 'username' in session:
        return redirect('/')
    form = RegisterForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        new_user = User.register(username=username, password=password,
                                 email=email, first_name=first_name,
                                 last_name=last_name)
        db.session.add(new_user)
        db.session.commit()

        session['username'] = new_user.username
        return redirect('/')

    return render_template('register-form.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'username' in session:
        return redirect('/')
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)
        if user:
            session['username'] = user.username
            return redirect('/')
        else:
            form.username.errors = ['Invalid username/password.']

    return render_template('login-form.html', form=form)


@app.route('/users/<username>')
def display_user(username):
    user = User.query.get_or_404(username)

    if 'username' in session:
        # and session['username'] == username
        return render_template('user.html', user=user)
    return redirect('/')


@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    if 'username' in session and session['username'] == username:
        user = User.query.get_or_404(username)
        db.session.delete(user)
        db.session.commit()
        session.pop('username')
    return redirect('/')


@app.route('/logout')
def logout():
    session.pop('username')
    return redirect('/')
