from flask import Flask, request, render_template, redirect, flash, session
from flask_bcrypt import Bcrypt
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Feedback
from forms import RegisterForm, LoginForm, FeedbackForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///user_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

app.config['SECRET_KEY'] = 'abc123'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)


@app.route('/')
def home_page():
    return redirect('/register')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if 'username' in session:
        return redirect(f'/users/{session["username"]}')
    form = RegisterForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        new_user = User.register(username=username, password=password,
                                 email=email, first_name=first_name, last_name=last_name)
        db.session.add(new_user)
        db.session.commit()

        session['username'] = new_user.username
        return redirect(f'/users/{new_user.username}')

    return render_template('register-form.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'username' in session:
        return redirect(f'/users/{session["username"]}')
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)
        if user:
            session['username'] = user.username
            return redirect(f'/users/{user.username}')
        else:
            form.username.errors = ['Invalid username/password.']

    return render_template('login-form.html', form=form)


@app.route('/users/<username>')
def display_user(username):
    user = User.query.get_or_404(username)

    feedback = Feedback.query.filter_by(username=username).all()

    if 'username' in session and session['username'] == username:
        return render_template('user.html', user=user, feedback=feedback)
    return redirect('/')


@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    if 'username' in session and session['username'] == username:
        user = User.query.get_or_404(username)
        db.session.delete(user)
        db.session.commit()
        session.pop('username')
    return redirect('/')


@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def add_feeedback(username):
    if 'username' not in session or session['username'] != username:
        return redirect('/')
    form = FeedbackForm()
    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data

        feedback = Feedback(title=title, content=content, username=username)
        db.session.add(feedback)
        db.session.commit()
        return redirect(f'/users/{username}')

    return render_template('feedback-form.html', form=form)


@app.route('/feedback/<feedback_id>/update', methods=['GET', 'POST'])
def edit_feedback(feedback_id):
    feedback = Feedback.query.get_or_404(feedback_id)
    if 'username' not in session or session['username'] != feedback.username:
        return redirect('/')
    form = FeedbackForm(obj=feedback)
    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data
        db.session.commit()
        return redirect(f'/users/{feedback.username}')

    return render_template('feedback-form.html', form=form)


@app.route('/feedback/<feedback_id>/delete', methods=['POST'])
def delete_feedback(feedback_id):
    feedback = Feedback.query.get_or_404(feedback_id)
    if 'username' in session and session['username'] == feedback.username:
        db.session.delete(feedback)
        db.session.commit()
    return redirect('/')


@app.route('/logout')
def logout():
    session.pop('username')
    return redirect('/')
