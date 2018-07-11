from flask_mail import Message
from threading import Thread
from natural_woman.models import *
from . import mail, app
from flask import request
import json
import json as simplejson

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

def get_product_by_id(pid):
	pid = int(pid)
	products = Product.query.all()
	q = -1
	for p in products:
		if p.id == pid:
			q = p
			break
	return q

def get_about_by_id(aid):
	aid = int(aid)
	abouts = About.query.all()
	q = -1
	for a in abouts:
		if a.id == aid:
			q = a
			break
	return q

def get_user_by_id(uid):
	uid = int(uid)
	users = User.query.all()
	q = -1
	for u in users:
		if u.id == uid:
			q = u
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

def get_company_model():
	companies = Company.query.all()
	return companies[0]

def json_serialize_blogs():
	data 	= []
	index 	= 0
	blogs 	= Blog.query.all()
	blogs.reverse()
	for b in blogs:
		d 				= {}
		date 			= b.getDate()
		d['subject'] 	= b.subject
		d['content'] 	= b.content
		d['date'] 		= date['date']
		d['time'] 		= date['time']
		d['date_obj'] 	= str(b.date)
		d['id'] 		= b.id
		d['index'] 		= index
		data.append(d)
		index += 1
	return data

def json_serialize_products():
	data 		= []
	index 		= 0
	products 	= Product.query.all()
	for p in products:
		d 					= {}
		d['id'] 			= p.id
		d['name'] 			= p.name
		d['price'] 			= p.price
		d['index'] 			= index
		d['description'] 	= p.description
		data.append(d)
		index += 1
	return data

def json_serialize_abouts():
	data 	= []
	index 	= 0
	abouts 	= About.query.all()
	for a in abouts:
		d 				= {}
		d['id'] 		= a.id
		d['statement'] 	= a.statement
		d['is_active'] 	= a.is_active
		d['index'] 		= index
		data.append(d)
		index += 1
	return data

def json_serialize_users():
	data 	= []
	index 	= 0
	users 	= User.query.all()
	for u in users:
		d 						= {}
		d['id'] 				= u.id
		d['fname'] 				= u.fname
		d['lname'] 				= u.lname
		d['email'] 				= u.email
		d['is_admin'] 			= u.is_admin
		d['product_permission'] = u.product_permission
		d['about_permission'] 	= u.about_permission
		d['blog_permission'] 	= u.blog_permission
		d['gallery_permission'] = u.gallery_permission
		d['index'] 				= index
		data.append(d)
		index += 1
	return data

def json_serialize_company():
	data = {}
	c 						= get_company_model()
	address2 				= isEmptyMember(c.address2)
	address3 				= isEmptyMember(c.address3)
	facebook 				= isEmptyMember(c.facebook_url)
	twitter 				= isEmptyMember(c.twitter_url)
	instagram 				= isEmptyMember(c.instagram_url)
	data['code'] 			= c.code
	data['address1'] 		= c.address1
	data['address2'] 		= address2
	data['address3'] 		= address3
	data['city'] 			= c.city
	data['state'] 			= c.state
	data['zip_code'] 		= c.zip_code
	data['phone'] 			= c.phone
	data['email'] 			= c.email
	data['hours_m_f'] 		= c.hours_m_f
	data['hours_sat'] 		= c.hours_sat
	data['hours_sun'] 		= c.hours_sun
	data['facebook_url'] 	= facebook
	data['twitter_url'] 	= twitter
	data['instagram_url'] 	= instagram
	return data

def isEmptyMember(literal):
	literal = str(literal)
	print("LITERAL VALUE: " + literal)
	if literal==None or literal=="" or literal=="null" or len(literal)==0 or literal=="None":
		literal = "empty"
	return literal

def load_admin_home():
	data 					= {}
	json_data 				= {}
	json_data['active'] 	= []
	json_data['inactive'] 	= []
	data['title'] 			= "Natural Woman Salon | Administration"
	data['btn_index'] 		= 6
	data['json_data'] 		= json_data
	return data

def get_about_list():
	data 		= {}
	a_list 		= []
	current 	= None
	abouts 		= json_serialize_abouts()
	for a in abouts:
		if a['is_active'] == False:
			a_list.append(a)
		else:
			current = a
	data['inactive'] 	= json.dumps(a_list)
	data['active'] 	= json.dumps(current)
	return data

def get_blog_content():
	data 				= {}
	blogs 				= json_serialize_blogs()
	data['active'] 		= json.dumps(blogs)
	data['inactive'] 	= []
	return data

def get_product_content():
	data 				= {}
	products 			= json_serialize_products()
	data['active'] 		= json.dumps(products)
	data['inactive'] 	= []
	return data

def get_company_content():
	data 				= {}
	company 			= json_serialize_company()
	data['active'] 		= company
	data['inactive'] 	= []
	return data

def get_user_json_data():
	data 				= {}
	users 				= json_serialize_users()
	data['active'] 		= users
	data['inactive'] 	= []
	return data

def getUserManagementContent(current_user):
	content 				= {}
	if current_user.is_admin == True:
		content['json_data'] 	= get_user_json_data()
		content['btn_index'] 	= 12
		content['title'] 		= "Natural Woman Salon | Manage Users"
		content['user'] 		= current_user
		content['url'] 			= "admin/editor.html"
	else:
		content['title'] 		= "Restricted Access"
		content['url'] 			= "admin/restrictedAccess.html"
	return content

def get_blog_list():
	data = []
	blogs = Blog.query.all()
	blogs.reverse()
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
	data 		= []
	products 	= Product.query.all()
	index 		= 0
	for p in products:
		d = {}
		d['product'] 	= p
		d['index'] 		= index
		data.append(d)
		index += 1
	return data

def get_sorted_products():
	products 	= Product.query.all()
	length 		= len(products)
	p_list 		= [None] * length
	for p in products:
		p_index = p.position - 1
		p_list.insert(p_index, p)
	return p_list

def set_active(about):
	abouts = About.query.all()
	for a in abouts:
		if str(about.id) != str(a.id) and a.is_active == True:
			a.is_active = False
			about.active = True
			a.save()
			about.save()

def set_active_exclusive(model):
	abouts = About.query.all()
	model.is_active = True
	model.save()
	for a in abouts:
		if a.is_active == True:
			a.is_active = False
			a.save()

def decode_checkbox(value):
	result = False
	value = str(value)
	if value == "1":
		result = True
	return result


def fetch_target_fields():
	data 	= {}
	target 	= str(request.form['target_model'])
	model_id = None
	model 	= None
	message = None

	if target == "new_blog":
		subject = str(request.form['subject'])
		content = str(request.form['blog_content'])
		model 	= Blog(subject, content)
		message = "A New Blog Has Been Successfully Added"
		model.save()
		data['model'] = "blog"
	elif target == "blog":
		data['model'] = "blog"
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
	elif target == "product":
		data['model'] = "product"
		action = str(request.form['target_action'])
		if action == "delete":
			model_id 	= str(request.form['target_id'])
			model 		= get_product_by_id(model_id)
			message 	= "Blog Post Successfully Deleted"
			model.delete()
		elif action == "edit":
			model_id 	= str(request.form['target_id'])
			model 		= get_product_by_id(model_id)
			name 		= str(request.form['name'])
			description = str(request.form['description'])
			price 		= str(request.form['price'])
			if len(name) != 0:
				model.name = name
			if len(description) != 0:
				model.description = description
			if len(price) != 0:
				model.price = int(price)
			model.save()
		elif action == "new":
			name 		= str(request.form['name'])
			description = str(request.form['description'])
			price 		= str(request.form['price'])
			model 		= Product(name, description, price)
			model.save()
	elif target == "about":
		data['model'] = "about"
		action = str(request.form['target_action'])
		if action == "new":
			statement 		= str(request.form['statement'])
			is_active 		= str(request.form['m_is_active'])
			model 			= About(statement)
			model.is_active = decode_checkbox(is_active)
			message 		= "A New About Us Statement Has Been Created"
			if is_active == "1":
				set_active(model)
			model.save()
		elif action == "update":
			statement 	= str(request.form['statement'])
			is_active 	= str(request.form['m_is_active'])
			model_id 	= str(request.form['target_id'])
			model 		= get_about_by_id(model_id)
			if len(statement) != 0:
				model.statement = statement
				model.is_active = decode_checkbox(is_active)
				if is_active == "1":
					set_active(model)
			message = "About Us Statement Successfully Updated"
			model.save()
		elif action == "swap":
			model_id 	= str(request.form['target_id'])
			model 		= get_about_by_id(model_id)
			message = "The About Us Statement Has Been Successfully Changed"
			set_active_exclusive(model)
			model.is_active = True
			model.save()
		elif action == "delete":
			model_id 	= str(request.form['target_id'])
			model 		= get_about_by_id(model_id)
			message 	= "The Selected Statement Has Been Deleted"
			model.delete()

	data['message'] 	= message
	data['title'] 		= "Natural Woman Salon | Administration"
	data['btn_index'] 	= 14
	return data



















