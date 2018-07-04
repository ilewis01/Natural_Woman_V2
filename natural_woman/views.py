from . import app
from natural_woman.functions import *
from flask_login import login_required, login_user, logout_user, current_user
from flask import render_template, redirect, request

@app.route('/')
def index():
	content = index_content()
	return render_template("global/index.html", **content)

@app.route('/home')
def home():
	content = home_comtent()
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
			return render_template("global/login_failure.html")
	else:
		return render_template("global/index.html")

@app.route('/logout')
@login_required
def logout():
	content = {}
	name = str(current_user.fname) + " " + str(current_user.lname)
	content["title"] = "Natural Woman Salon | Logout"
	content['name'] = name
	current_user.authenticated = False
	current_user.save()
	logout_user()
	return render_template("admin/logout.html", **content)

@app.route('/admin_home')
@login_required
def admin_home():
	content = {}
	content['user'] = current_user
	content['title'] = "Natural Woman Salon | Administration"
	content['btn_index'] = 6
	content['json_data'] = None
	return render_template("admin/home.html", **content)

@app.route('/blog_editor')
@login_required
def blog_editor():
	content = {}
	content['user'] = current_user
	content['title'] = "Natural Woman Salon | Blog Management"
	content['btn_index'] = 7
	content['blogs'] = get_blog_list()
	content['json_data'] = None
	return render_template("admin/editor.html", **content)

@app.route('/product_editor')
@login_required
def product_editor():
	content = {}
	content['user'] = current_user
	content['title'] = "Natural Woman Salon | Product Management"
	content['btn_index'] = 8
	content["products"] = get_product_list()
	content['json_data'] = None
	return render_template("admin/editor.html", **content)

@app.route('/about_editor')
@login_required
def about_editor():
	content = {}
	content['user'] = current_user
	content['title'] = "Natural Woman Salon | About Us"
	content['btn_index'] = 9
	content["json_data"] = get_about_list()
	return render_template("admin/editor.html", **content)

@app.route('/gallery_editor')
@login_required
def gallery_editor():
	content = {}
	content['user'] = current_user
	content['title'] = "Natural Woman Salon | Image Manager"
	content['btn_index'] = 10
	content["statements"] = get_about_list()
	return render_template("admin/editor.html", **content)

@app.route('/company_editor')
@login_required
def company_editor():
	content = {}
	content['user'] = current_user
	content['title'] = "Natural Woman Salon | Company Profile"
	content['btn_index'] = 11
	content["product"] = get_product_list()
	return render_template("admin/editor.html", **content)

@app.route('/user_editor')
@login_required
def user_editor():
	content = {}
	content['user'] = current_user
	content['title'] = "Natural Woman Salon | Manage Users"
	content['btn_index'] = 12
	content["statements"] = get_about_list()
	return render_template("admin/editor.html", **content)

@app.route('/user_access')
@login_required
def user_access():
	content = {}
	content['user'] = current_user
	content['title'] = "Natural Woman Salon | User Access"
	content['btn_index'] = 13
	content["statements"] = get_about_list()
	return render_template("admin/editor.html", **content)

@app.route('/edit_success', methods=["POST"])
@login_required
def edit_success():
	if request.method == "POST":
		content = fetch_target_fields()
		return render_template("admin/editor.html", **content)


















