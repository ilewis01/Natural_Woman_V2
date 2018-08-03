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
	content = {}
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

@app.route('/admin')
def admin():
	return render_template("admin/master/login.html")

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
			return redirect("/adminAlt")
		else:
			return render_template("global/login_failure.html")
	else:
		return redirect("/")

@app.route('/adminAlt')
@login_required
def adminAlt():
	action 	= "/adminAlta"
	content = loadSuperuser(current_user)
	content['action_url'] = action
	return render_template(content['url'], **content)

@app.route('/adminAlta', methods=["POST"])
@login_required
def adminAlta():
	action 	= "/adminAltb"
	content = alterDb(current_user, action)
	content['action_url'] = action
	return render_template(content['url'], **content)

@app.route('/adminAltb', methods=["POST"])
@login_required
def adminAltb():
	action 	= "/adminAlta"
	content = alterDb(current_user, action)
	content['action_url'] = action
	return render_template(content['url'], **content)

@app.route('/email', methods=["GET"])
@login_required
def email():
	content = {}
	content['company'] = {}
	content['c_user'] = current_user
	return render_template("admin/master/masterEmail.html", **content)

@app.route('/logout')
@login_required
def logout():
	current_user.authenticated = False
	current_user.save()
	logout_user()
	return render_template("admin/master/logout.html")













# @app.route('/suauth', methods=["POST"])
# def suauth():
# 	if request.method == "POST":
# 		email = str(request.form['email'])
# 		password = str(request.form['password'])
# 		user = fetch_user_by_email(email)
# 		if user is not None and user.password_validated(password):
# 			user.authenticated = True
# 			user.save()
# 			login_user(user)
# 			return redirect("/adminAlt")
# 		else:
# 			return render_template("global/login_failure.html")
# 	else:
# 		return render_template("global/index.html")





# @app.route('/admin_home')
# @login_required
# def admin_home():
# 	content = load_admin_home(current_user)
# 	return render_template(content['url'], **content)



# @app.route('/blog_editor')
# @login_required
# def blog_editor():
# 	content = getBlogManagementContent(current_user)
# 	return render_template(content['url'], **content)

# @app.route('/product_editor')
# @login_required
# def product_editor():
# 	content = getProductManagementContent(current_user)
# 	return render_template(content['url'], **content)

# @app.route('/about_editor')
# @login_required
# def about_editor():
# 	content = getAboutManagementContent(current_user)
# 	return render_template(content['url'], **content)

# @app.route('/gallery_editor')
# @login_required
# def gallery_editor():
# 	content = getGalleryManagementContent(current_user)
# 	return render_template(content['url'], **content)

# @app.route('/company_editor')
# @login_required
# def company_editor():
# 	content = getCompanyManagementContent(current_user)
# 	return render_template(content['url'], **content)

# @app.route('/user_editor')
# @login_required
# def user_editor():
# 	content = getUserManagementContent(current_user)
# 	return render_template(content['url'], **content)

# @app.route('/user_access')
# @login_required
# def user_access():
# 	content = getUserAccessContent(current_user)
# 	return render_template(content['url'], **content)

# @app.route('/edit_success', methods=["POST"])
# @login_required
# def edit_success():
# 	if request.method == "POST":
# 		content = getEditSuccessData(current_user)
# 		return render_template("admin/editor.html", **content)

# @app.route('/email')
# @login_required
# def email():
# 	content = getEmailContent(current_user)
# 	return render_template(content['url'], **content)

# @app.route('/set_password')
# @login_required
# def set_password():
# 	content = getSetPasswordContent(current_user)
# 	return render_template(content['url'], **content)

# @app.route('/set_name')
# @login_required
# def set_name():
# 	content = getSetNameContent(current_user)
# 	return render_template(content['url'], **content)

# @app.route('/set_email')
# @login_required
# def set_email():
# 	content = getSetEmailContent(current_user)
# 	return render_template(content['url'], **content)

# @app.route('/account_changed', methods=["POST"])
# @login_required
# def account_changed():
# 	if request.method == "POST":
# 		content = attemptChangeAccount(current_user)
# 		return render_template(content['url'], **content)
	



















