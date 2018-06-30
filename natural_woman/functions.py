from flask_mail import Message
from threading import Thread
from natural_woman.models import *
from . import mail, app
from flask import request

def user_exist(email):
	exist = False
	email = str(email)
	users = User.query.all()
	for u in users:
		if str(u.email) == email:
			exist = True
			break
	return exist

def fetch_user_by_email(email):
	user = None
	users = User.query.all()
	for u in users:
		if str(u.email) == email:
			user = u
			break
	return user

def get_blog_by_id(bid):
	bid = int(bid)
	blogs = Blog.query.all()
	q = -1
	for b in blogs:
		if b.id == bid:
			q = b
			break
	return q

def index_content():
	content = {}
	content['title'] = "Natural Woman Salon"
	content['btn_index'] = -1
	return content

def home_content():
	content = {}
	content['title'] = "Natural Woman Salon | Home"
	content['btn_index'] = 0
	return content

def register_user(fname, lname, email, password):
	content = {}
	if not user_exist(email):
		user = User(fname, lname, email, password)
		user.save()
		# message = "Thanks for registering with Natural Woman"
		# send_email("Registration", "redd.app.dev@gmail.com", email, message, "<h3>" + message + "</h3>")
		content['url'] = "global/register.html"
		content['title'] = "Natural Woman Salon | Registration Success"
		content['btn_index'] = -1
		content['user'] = user
		return content
	else:
		content['url'] = "global/user_exist.html"
		content['title'] = "Natural Woman Salon | Error"
		return content

def send_email(subject, sender, recipients, text_body, html_body):
	text = "Thank you for registering with Natural Woman Salon"
	msg = Message(subject, sender=sender, recipients=recipients)
	msg.body = text_body
	msg.html = html_body
	mail.send(msg)
	# mail.send(msg)

# def send_async_email(msg):
# 	with app.app_context():
# 		mail.send(msg)

# def send_email(subject, recipients, text_body, html_body):
# 	msg = Message(subject, recipients=recipients)
# 	msg.body = text_body
# 	msg.html = html_body
# 	thr = Thread(target=send_async_email, args=[msg])
# 	thr.start()

def get_blog_list():
	data = []
	blogs = Blog.query.all()
	count = 0
	for b in blogs:
		d = {}
		d['blog'] = b
		d['date'] = b.getDate()
		d['index'] = count
		count += 1
		data.append(d)
	return data

def get_product_list():
	return Product.query.all()

def get_about_list():
	data = {}
	abouts = About.query.all()
	a_list = []
	for a in abouts:
		if a.active == False:
			a_list.append(a)
		else:
			data['current'] = a
	data['inactive'] = a_list
	return data

def fetch_target_fields():
	data 	= {}
	target 	= str(request.form['target_model'])
	model 	= None
	message = None

	if target == "new_blog":
		subject = str(request.form['subject'])
		content = str(request.form['blog_content'])
		model 	= Blog(subject, content)
		message = "A New Blog Has Been Successfully Added"
		model.save()
	elif target == "blog":
		action = str(request.form['target_action'])
		model_id = str(request.form['target_id'])
		model = get_blog_by_id(model_id)
		if action == "delete":
			model.delete()
			message = "Blog Post Successfully Deleted"
		elif action == "update":
			model.subject = str(request.form["subject"])
			model.content = str(request.form["content"])
			model.save()
			message = "Blog Post Successfully Updated"


	data['message'] 	= message
	data['title'] 		= "Natural Woman Salon | Administration"
	data['btn_index'] 	= 14
	return data



















