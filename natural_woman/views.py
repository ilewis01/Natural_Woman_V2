from . import app
from natural_woman.functions import *
from flask_login import login_required, login_user, logout_user, current_user
from flask import render_template, redirect, request

@app.route('/')
def index():
	content = index_content()
	return render_template("global/index.html", **content)

@app.route('/sign_up')
def sign_up():
	title = "Natural Woman Salon | Registration"
	return render_template("global/signup.html", title=title)

@app.route('/register', methods=["POST"])
def register():
	if request.method == "POST":
		fname = str(request.form['fname'])
		lname = str(request.form['lname'])
		email = str(request.form['email'])
		passw = str(request.form['password'])
		content = register_user(fname, lname, email, passw)
		return render_template(content["url"], **content)
	else:
		return redirect("/")

@app.route('/auth', methods=["POST"])
def auth():
	if request.method == "POST":
		email = str(request.form['email'])
		password = str(request.form['password'])
		user = fetch_user_by_email(email)
		if user is not None and user.password_validated(password):
			user.authenticated = True
			user.save()
			login_user(user)
			return redirect("/admin_home")
		else:
			return render_template("global/user_exist.html")
	else:
		return render_template("global/index.html")

@app.route('/logout')
@login_required
def logout():
	content = {}
	user = current_user
	name = str(user.fname) + " " + str(user.lname)
	content["title"] = "Natural Woman Salon | Logout"
	content['name'] = name
	user.authenticated = False
	user.save()
	logout_user()
	return render_template("admin/logout.html", **content)

@app.route('/admin_home')
@login_required
def admin_home():
	content = {}
	content['user'] = current_user
	content['title'] = "Natural Woman Salon | Administration"
	content['btn_index'] = 6
	return render_template("admin/home.html", **content)


















