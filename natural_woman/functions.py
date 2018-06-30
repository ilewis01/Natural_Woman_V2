from flask_mail import Message
from threading import Thread
from natural_woman.models import *
from . import mail, app

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



















