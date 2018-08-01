from flask_mail import Message
from threading import Thread
from natural_woman.models import *
from . import mail, app, images
from flask import request, url_for
from werkzeug.utils import secure_filename
import json
import random
import string
import os

def generateRandomCode(numberChars):
	numberChars = int(numberChars)
	code 		= ""
	for i in range(numberChars):
		ANchoice = random.randint(0, 1000)
		alphaNum = ANchoice % 2
		if alphaNum == 0:
			code += random.choice(string.ascii_uppercase)
		elif alphaNum == 1:
			code += str(random.randint(0,9))
	return code


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

def getImageById(img_id):
	image = None
	img_id = str(img_id)
	i_list = Image.query.all()
	for i in i_list:
		if img_id == str(i.id):
			image = i
			break
	return image

def isQueued(target_model, mid):
	queued = False
	model_list = None
	target_model = str(target_model)
	if target_model == "user":
		model_list = User.query.all()
	elif target_model == "product":
		model_list = Product.query.all()
	elif target_model == "about":
		model_list = About.query.all()
	elif target_model == "payment":
		model_list = Payment.query.all()
	elif target_model == "blog":
		model_list = Blog.query.all()
	elif target_model == "auth":
		model_list = Authorization.query.all()
	elif target_model == "image":
		model_list = Image.query.all()
	for m in model_list:
		if str(m.id) == str(mid):
			queued = True
			break
	return queued

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

def cleanInputText(val):
	result 	= ""
	val 	= str(val)
	for v in val:
		
		result += v
	return result

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
		if index % 2 == 1:
			d['class'] = "li-shade1"
		else:
			d['class'] = "li-shade2"
		d['index'] 		= index
		data.append(d)
		index += 1
	return data

def json_serialize_products():
	data 		= []
	index 		= 0
	products 	= Product.query.all()
	products.reverse()
	for p in products:
		d 					= {}
		d['id'] 			= p.id
		d['name'] 			= p.name
		d['price'] 			= p.price
		d['index'] 			= index
		d['description'] 	= p.description
		if index % 2 == 1:
			d['class'] = "li-shade1"
		else:
			d['class'] = "li-shade2"
		data.append(d)
		index += 1
	return data

def json_serialize_image_data():
	data				= {}
	company				= get_company_model()
	data['max_images']	= company.max_images
	data['num_images']	= company.num_uploads
	return data

def json_serialize_gallery():
	data 	= []
	profile = json_serialize_image_data();
	index 	= 0
	images 	= Image.query.all()
	images.reverse()
	for i in images:
		d = {}
		d['id'] 		= i.id
		d['url'] 		= i.img_url
		d['name'] 		= i.img_filename
		d['index'] 		= index
		d['max'] 		= profile['max_images']
		d['uploads']	= profile['num_images']
		if index % 2 == 1:
			d['class'] = "li-shade1"
		else:
			d['class'] = "li-shade2"
		data.append(d)
		index += 1
	return data

def json_serialize_security():
	data = []
	index = 0
	questions = SecurityQuestion.query.all()
	for q in questions:
		d 				= {}
		d['id'] 		= q.id
		d['question'] 	= q.question
		d['index'] 		= index
		if index % 2 == 1:
			d['class'] = "li-shade1"
		else:
			d['class'] = "li-shade2"
		data.append(d)
		index += 1
	return data

def json_serialize_auths():
	data = []
	index = 0
	auths = Authorization.query.all()
	for a in auths:
		d = {}
		d['index'] = index
		d['name'] = a.auth_name
		d['email'] = a.auth_email
		d['admin'] = str(a.auth_admin)
		d['product'] = str(a.auth_product)
		d['about'] = str(a.auth_about)
		d['blog'] = str(a.auth_blog)
		d['image'] = str(a.auth_gallery)
		d['lock'] = str(a.auth_locked)
		d['super'] = str(a.auth_super)
		if index % 2 == 1:
			d['class'] = "li-shade1"
		else:
			d['class'] = "li-shade2"
		data.append(d)
		index += 1
	return data

def json_serialize_abouts():
	data 	= []
	index 	= 0
	abouts 	= About.query.all()
	abouts.reverse()
	for a in abouts:
		d 				= {}
		d['id'] 		= a.id
		d['statement'] 	= a.statement
		d['is_active'] 	= a.is_active
		d['index'] 		= index
		if index % 2 == 1:
			d['class'] = "li-shade1"
		else:
			d['class'] = "li-shade2"
		data.append(d)
		index += 1
	return data

def json_serialize_users(user):
	data 	= []
	index 	= 0
	users 	= User.query.all()
	users.reverse()
	for u in users:
		if str(user.id) != str(u.id):
			d 						= {}
			d['id'] 				= u.id
			d['fname'] 				= u.fname
			d['lname'] 				= u.lname
			d['email'] 				= u.email
			d['is_admin'] 			= str(u.is_admin)
			d['product_permission'] = str(u.product_permission)
			d['about_permission'] 	= str(u.about_permission)
			d['blog_permission'] 	= str(u.blog_permission)
			d['gallery_permission'] = str(u.gallery_permission)
			d['isSuper'] 			= str(u.is_super)
			d['isLocked'] 			= str(u.is_locked)
			d['index'] 				= index
			data.append(d)
			index += 1
	return data

def json_serialize_users_all():
	data 	= []
	index 	= 0
	users 	= User.query.all()
	users.reverse()
	for u in users:
		d 						= {}
		d['id'] 				= u.id
		d['fname'] 				= u.fname
		d['lname'] 				= u.lname
		d['email'] 				= u.email
		d['is_admin'] 			= str(u.is_admin)
		d['product_permission'] = str(u.product_permission)
		d['about_permission'] 	= str(u.about_permission)
		d['blog_permission'] 	= str(u.blog_permission)
		d['gallery_permission'] = str(u.gallery_permission)
		d['isSuper'] 			= str(u.is_super)
		d['isLocked'] 			= str(u.is_locked)
		d['index'] 				= index
		if index % 2 == 1:
			d['class'] = "li-shade1"
		else:
			d['class'] = "li-shade2"
		data.append(d)
		index += 1
	return data

def queryAbouts():
	data 	= []
	index 	= 0
	abouts 	= About.query.all()
	for a in abouts:
		d = {}
		d["statement"] 	= a.statement
		d['is_active'] 	= str(a.is_active)
		d['id']			= a.id
		d['index'] 		= index
		if index % 2 == 1:
			d['class'] = "li-shade1"
		else:
			d['class'] = "li-shade2"
		data.append(d)
		index += 1
	return data

def loadSuperuser(user):
	data = {}
	data['users'] 		= json_serialize_users_all()
	data['blogs'] 		= json_serialize_blogs() 
	data['products'] 	= json_serialize_products()
	data['images'] 		= json_serialize_gallery()
	data['payments']	= json_serialize_payments()
	data['company'] 	= json_serialize_company()
	data['auths'] 		= json_serialize_auths()
	data['questions']	= json_serialize_security()
	data['c_user'] 		= user
	data['url'] 		= "admin/master/superuser_admin.html"
	return data

def encodeAuthData():
	data  = {}
	u_txt = ""
	a_txt = ""
	users = User.query.all()
	auths = Authorization.query.all()
	for u in users:
		u_txt += u.email
		u_txt += "~&|"
	for a in auths:
		a_txt += a.auth_email
		a_txt += "~&|"
	data['active'] = a_txt
	data['inactive'] = u_txt
	return data

def json_serialize_company():
	data = {}
	c 						= get_company_model()
	group_weekdays 			= c.group_weekdays
	group_weekends 			= c.group_weekends
	address1 				= isEmptyMember(c.address1)
	address2 				= isEmptyMember(c.address2)
	address3 				= isEmptyMember(c.address3)
	facebook 				= isEmptyMember(c.facebook_url)
	twitter 				= isEmptyMember(c.twitter_url)
	instagram 				= isEmptyMember(c.instagram_url)
	data['code'] 			= c.code
	data['address1'] 		= address1
	data['address2'] 		= address2
	data['address3'] 		= address3
	data['city'] 			= c.city
	data['state'] 			= c.state
	data['zip_code'] 		= c.zip_code
	data['phone'] 			= c.phone
	data['email'] 			= c.email
	data['facebook_url'] 	= facebook
	data['twitter_url'] 	= twitter
	data['instagram_url'] 	= instagram
	data['hours_title'] 	= c.hours_title
	data['monday'] 			= c.monday
	data['saturday'] 		= c.saturday
	data['show_facebook'] 	= str(c.show_facebook)
	data['show_instagram'] 	= str(c.show_instagram)
	data['show_twitter'] 	= str(c.show_twitter)
	data['special_hours'] 	= str(c.special_hours)
	data['group_weekdays'] 	= str(group_weekdays)
	data['group_weekends'] 	= str(group_weekends)
	data['max_images'] 		= c.max_images
	data['num_uploads'] 	= c.num_uploads

	if group_weekdays == False:
		data['tuesday'] 	= c.tuesday
		data['wednesday'] 	= c.wednesday
		data['thursday'] 	= c.thursday
		data['friday'] 		= c.friday
	else:
		data['tuesday'] 	= "empty"
		data['wednesday'] 	= "empty"
		data['thursday'] 	= "empty"
		data['friday'] 		= "empty"
	if group_weekends == False:
		data['sunday'] 		= c.sunday
	else:
		data['sunday'] 		= "empty"
	data['abouts'] 			= queryAbouts()
	return data

def json_serialize_payments():
	data 		= []
	index 		= 0
	payments 	= Payment.query.all()
	for p in payments:
		d = {}
		d['method'] 		= str(p.method).lower()
		d['is_accepted'] 	= str(p.is_accepted)
		d['icon'] 			= p.icon
		d['index'] 			= index
		if index % 2 == 1:
			d['class'] 		= "li-shade1"
		else:
			d['class'] 		= "li-shade2"
		index += 1
		data.append(d)
	return data

def isEmptyMember(literal):
	literal = str(literal)
	if literal==None or literal=="" or literal=="null" or len(literal)==0 or literal=="None":
		literal = "empty"
	return literal

def get_about_list():
	data 		= {}
	a_list 		= []
	current 	= None
	abouts 		= json_serialize_abouts()
	for a in abouts:
		if a['is_active'] == False:
			a_list.append(a)
		else:
			current 	= a
	data['inactive'] 	= json.dumps(a_list)
	data['active'] 		= json.dumps(current)
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
	data['active'] 		= json_serialize_company()
	data['inactive'] 	= json_serialize_payments()
	return data

def get_blog_json_data():
	data 				= {}
	data['active'] 		= json_serialize_blogs()
	data['inactive'] 	= []
	return data

def get_product_json_data():
	data 				= {}
	data['active'] 		= json_serialize_products()
	data['inactive'] 	= []
	return data

def get_user_json_data(current_user):
	data 				= {}
	users 				= json_serialize_users(current_user)
	data['active'] 		= users
	data['inactive'] 	= []
	return data

def get_gallery_json_data():
	data = {}
	gallery 			= json_serialize_gallery()
	company 			= json_serialize_image_data()
	data['inactive'] 	= json.dumps(gallery)
	data['active'] 		= json.dumps(company)
	return data

def get_empty_json_data():
	data = {}
	data['active'] = []
	data['inactive'] = []
	return data

def load_admin_home(current_user):
	data 					= {}
	data['title'] 			= "Natural Woman Salon | Administration"
	data['user'] 			= current_user
	data['btn_index'] 		= 6
	data['json_data'] 		= get_empty_json_data()
	data['is_edited'] 		= "0"
	data['header'] 			= "empty"
	data['icon'] 			= "empty"
	data['message'] 		= "empty"
	data['url'] 			= "admin/home.html"
	return data

def getBlogManagementContent(current_user):
	content 					= {}
	content['json_data'] 		= get_blog_json_data()
	content['user'] 			= current_user
	if current_user.blog_permission == True:
		content['btn_index'] 	= 7
		content['title'] 		= "Natural Woman Salon | Blog Management"
		content['url'] 			= "admin/editor.html"
		content['restricted'] 	= 0
	else:
		content['restricted'] 	= 1
		content['title'] 		= "Restricted Access"
		content['url'] 			= "admin/restrictedAccess.html"
	content['is_edited'] 		= "0"
	content['header'] 			= "empty"
	content['icon'] 			= "empty"
	content['message'] 			= "empty"
	return content

def getProductManagementContent(current_user):
	content 					= {}
	content['json_data'] 		= get_product_json_data()
	content['user'] 			= current_user
	if current_user.product_permission == True:
		content['btn_index'] 	= 8
		content['user'] 		= current_user
		content['title'] 		= "Natural Woman Salon | Product Management"
		content['url'] 			= "admin/editor.html"
		content['restricted'] 	= 0
	else:
		content['restricted'] 	= 1
		content['title'] 		= "Restricted Access"
		content['url'] 			= "admin/restrictedAccess.html"
	content['is_edited'] 		= "0"
	content['header'] 			= "empty"
	content['icon'] 			= "empty"
	content['message'] 			= "empty"
	return content

def getAboutManagementContent(current_user):
	content 					= {}
	content['json_data'] 		= get_about_list()
	content['user'] 			= current_user
	if current_user.about_permission == True:
		content['btn_index'] 	= 9
		content['user'] 		= current_user
		content['title'] 		= "Natural Woman Salon | About Statement"
		content['url'] 			= "admin/editor.html"
		content['restricted'] 	= 0
	else:
		content['restricted'] 	= 1
		content['title'] 		= "Restricted Access"
		content['url'] 			= "admin/restrictedAccess.html"
	content['is_edited'] 		= "0"
	content['header'] 			= "empty"
	content['icon'] 			= "empty"
	content['message'] 			= "empty"
	return content

def getGalleryManagementContent(current_user):
	content 					= {}
	content['json_data'] 		= get_gallery_json_data()
	content['user'] 			= current_user
	if current_user.gallery_permission == True:
		content['btn_index'] 	= 10
		content['user'] 		= current_user
		content['title'] 		= "Natural Woman Salon | Gallery Management"
		content['url'] 			= "admin/editor.html"
		content['restricted'] 	= 0
	else:
		content['restricted'] 	= 1
		content['title'] 		= "Restricted Access"
		content['url'] 			= "admin/restrictedAccess.html"
	content['is_edited'] 		= "0"
	content['header'] 			= "empty"
	content['icon'] 			= "empty"
	content['message'] 			= "empty"
	return content

def getCompanyManagementContent(current_user):
	content 					= {}
	content['json_data'] 		= get_company_content()
	content['user'] 			= current_user
	if current_user.is_admin == True:
		content['btn_index'] 	= 11
		content['user'] 		= current_user
		content['title'] 		= "Natural Woman Salon | Company Profile"
		content['url'] 			= "admin/editor.html"
		content['restricted'] 	= 0
	else:
		content['restricted'] 	= 1
		content['title'] 		= "Restricted Access"
		content['url'] 			= "admin/restrictedAccess.html"
	content['is_edited'] 		= "0"
	content['header'] 			= "empty"
	content['icon'] 			= "empty"
	content['message'] 			= "empty"
	return content

def getUserManagementContent(current_user):
	content 					= {}
	content['json_data'] 		= get_user_json_data(current_user)
	content['user'] 			= current_user
	if current_user.is_admin == True:
		content['btn_index'] 	= 12
		content['title'] 		= "Natural Woman Salon | Manage Users"
		content['user'] 		= current_user
		content['restricted'] 	= 0
		content['url'] 			= "admin/editor.html"
	else:
		content['restricted'] 	= 1
		content['title'] 		= "Restricted Access"
		content['url'] 			= "admin/restrictedAccess.html"
	content['is_edited'] 		= "0"
	content['header'] 			= "empty"
	content['icon'] 			= "empty"
	content['message'] 			= "empty"
	return content

def getUserAccessContent(current_user):
	content 					= {}
	content['json_data'] 		= get_empty_json_data()
	content['user'] 			= current_user
	if current_user.is_admin == True:
		content['btn_index'] 	= 13
		content['title'] 		= "Natural Woman Salon | User Access"
		content['user'] 		= current_user
		content['url'] 			= "admin/editor.html"
		content['restricted'] 	= 0
	else:
		content['restricted'] 	= 1
		content['title'] 		= "Restricted Access"
		content['url'] 			= "admin/restrictedAccess.html"
	content['is_edited'] 		= "0"
	content['header'] 			= "empty"
	content['icon'] 			= "empty"
	content['message'] 			= "empty"
	return content

def getEmailContent(current_user):
	content = {}
	content['json_data'] 	= get_empty_json_data()
	content['btn_index'] 	= 20
	content['restricted'] 	= 0
	content['title'] 		= "Natural Woman Salon |  Email"
	content['user'] 		= current_user
	content['url'] 			= "admin/email.html"
	content['is_edited'] 		= "0"
	content['header'] 			= "empty"
	content['icon'] 			= "empty"
	content['message'] 			= "empty"
	return content

def getSetPasswordContent(current_user):
	content = {}
	content['json_data'] 	= get_empty_json_data()
	content['btn_index'] 	= 21
	content['title'] 		= "Natural Woman Salon |  Change Password"
	content['user'] 		= current_user
	content['url'] 			= "admin/editor.html"
	content['is_edited'] 		= "0"
	content['header'] 			= "empty"
	content['icon'] 			= "empty"
	content['message'] 			= "empty"
	return content

def getSetNameContent(current_user):
	content = {}
	content['json_data'] 	= get_empty_json_data()
	content['btn_index'] 	= 22
	content['title'] 		= "Natural Woman Salon |  Account Profile"
	content['user'] 		= current_user
	content['url'] 			= "admin/editor.html"
	content['is_edited'] 		= "0"
	content['header'] 			= "empty"
	content['icon'] 			= "empty"
	content['message'] 			= "empty"
	return content

def getSetEmailContent(current_user):
	content = {}
	content['json_data'] 	= get_empty_json_data()
	content['btn_index'] 	= 23
	content['title'] 		= "Natural Woman Salon |  Account Profile"
	content['user'] 		= current_user
	content['url'] 			= "admin/editor.html"
	content['is_edited'] 		= "0"
	content['header'] 			= "empty"
	content['icon'] 			= "empty"
	content['message'] 			= "empty"
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

def getActiveAbout():
	active = None
	abouts = About.query.all()
	for a in abouts:
		if a.is_active == True:
			active = a
			break
	return active

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

def getEditSuccessData(user):
	content 		= {}
	icon 			= None
	header 			= None
	message 		= None
	json_data 		= None
	index 			= None
	is_edited 		= 1
	target_model 	= str(request.form['target_model'])
	target_action 	= str(request.form["target_action"])
	success 		= save_target_model(target_model, target_action)
	if success == False:
		is_edited 	= 0
	if target_model == "new_blog":
		header 		= "New Blog Post"
		message 	= "A new blog has been posted"
		json_data 	= get_empty_json_data()
		index 		= 6
	elif target_model == "blog":
		header 		= "Manage Blogs"
		json_data 	= get_blog_json_data()
		index 		= 7
		if target_action == "delete":
			message = "Blog Post Successfully Deleted"
		elif target_action == "update":
			message = "Blog Post Successfully Updated"
	elif target_model =="product":
		header 		= "Manage Products & Pricing"
		json_data 	= get_product_json_data()
		index 		= 8
		if target_action == "delete":
			message = "Product Successfully Deleted"
		elif target_action == "update":
			message = "Product Successfully Updated"
		elif target_action == "new":
			message = "A New Product Has Been Created"
	elif target_model =="about":
		header 		= "About Statement"
		json_data 	= get_about_list()
		index 		= 9
		if target_action == "new":
			message = "A New About Statement Has Been Created"
		elif target_action == "update":
			message = "About Us Statement Successfully Updated"
		elif target_action == "swap":
			message = "The Active About Statement Has Been Changed"
		elif target_action == "delete":
			message = "The Selected Statement Has Been Deleted"
	elif target_model == "image":
		header 		= "Manage Gallery Images"
		index 		= 10
		json_data 	= get_gallery_json_data()
		if target_action == "delete":
			message = "Image Successfully Deleted"
		elif target_action == "upload":
			message = "Image Successfully Saved"
	elif target_model == "company":
		header 		= "Contact & Company Profile"
		message 	= "Company Profile Successfully Updated"
		json_data 	= get_company_content()
		index 		= 11
	elif target_model == "user":
		header 		= "User Management"
		json_data 	= get_user_json_data(user)
		index 		= 12
		if target_action == "update":
			message = "User Privileges Sucessfully Updated"
		elif target_action == "block":
			message = "User Privileges Successfully Blocked"
		elif target_action == "delete":
			message = "User Successfully Deleted"
	elif target_model == "authorize":
		is_edited = 1
		content['buildOption'] = "0"
		header 		= "Authorize New User"
		json_data 	= get_empty_json_data()
		index 		= 13
		requestSent = False
		auth 		= None
		ret_email 	= str(request.form['email'])
		if success == False:
			a_list 		= Authorization.query.all()
			for a in a_list:
				if ret_email == str(a.auth_email):
					requestSent = True
					auth = a
					break
			if requestSent == True:
				json_data['active'] = auth.id
				json_data['inactive'] = auth.id
				message = "You have already authorized this user. Would you like to send them another authorization code?"
				content['buildOption'] = "1"
			else:
				message = "There is an existing account associated with this email. No further action will be taken. You can manage existing account in \"<b>User Management</b>\""
		else:
			alist 	= Authorization.query.all()
			for a in alist:
				if ret_email == str(a.auth_email):
					auth = a
					break
			code = generateRandomCode(8)
			# SEND NEW USER A EMAIL HERE WITH THE AUTHORIZATION CODE
			auth.setCode(code)
			auth.save()
			message = "An Authorization Code Has Been Sent"
	elif target_model == "reAuth":
		auth_id = str(request.form['target_id'])
		header = "Authorize New User"
		message = "A new authorization code has been sent."
		json_data = get_empty_json_data()
		json_data['active'] = auth_id
		json_data['inactive'] = auth_id
		index = 13
	content['user'] 		= user
	content['header'] 		= header
	content['message'] 		= message
	content['json_data'] 	= json_data
	content['btn_index'] 	= index
	content['is_edited'] 	= is_edited
	content['title']		= "Natural Woman Salon | Administration"
	return content

def decodeJqueryBool(val):
	result = True
	val = str(val)
	if val == "False":
		result = False
	return result

def decodeBoolInteger(val):
	result = True
	if str(val) == "0":
		result = False
	return result

def attemptChangeAccount(user):
	content 	= {}
	header 		= ""
	message 	= ""
	index 		= 0
	action 		= str(request.form['target_action'])
	if action == "change_password":
		password_entered 	= str(request.form['old'])
		password_request 	= str(request.form['password1'])
		index 				= 21
		isValid = user.password_validated(password_entered)
		if isValid == True:
			message 	= " "
			header 		= "Password Successfully Updated"
			user.set_password(password_request)
			user.save()
		else:
			header 		= "Incorrect Password Entered"
			message 	= "You must enter your current password correctly to make any changes to your account. This is for your security. If you do not remember your password, you can retrieve it by clicking on the \"forgot password\" button on the login page."

	if action == "change_email":
		password_entered 	= str(request.form['password'])
		index 				= 23
		isValid = user.password_validated(password_entered)
		if isValid == True:
			message 	= " "
			header 		= "Email Successfully Updated"
			email 		= str(request.form['email1'])
			user.email 	= email
			user.save()
		else:
			header 		= "Incorrect Password Entered"
			message 	= "You must enter your current password correctly to make any changes to your account. This is for your security. If you do not remember your password, you can retrieve it by clicking on the \"forgot password\" button on the login page."

	if action == "change_name":
		password_entered 	= str(request.form['password'])
		index 				= 22
		isValid = user.password_validated(password_entered)
		if isValid == True:
			message 	= " "
			header 		= "Name Successfully Updated"
			fname 		= str(request.form['fname'])
			lname 		= str(request.form['lname'])
			user.fname 	= fname
			user.lname 	= lname
			user.save()
		else:
			header 		= "Incorrect Password Entered"
			message 	= "You must enter your current password correctly to make any changes to your account. This is for your security. If you do not remember your password, you can retrieve it by clicking on the \"forgot password\" button on the login page."
	content['message'] 		= message
	content['header'] 		= header
	content['is_edited'] 	= 1
	content["btn_index"] 	= index
	content['json_data'] 	= get_empty_json_data()
	content['user'] 		= user
	content['url'] 			= "admin/editor.html"
	content['title'] 		= "Natural Woman Salon | Reset Password"
	return content

def save_target_model(target, action):
	complete = True
	target = str(target)
	if target == "company":
		action 			= str(request.form['target_action'])
		company 		= get_company_model()
		payments 		= Payment.query.all()
		address1 		= str(request.form['master_address1'])
		address2 		= str(request.form['master_address2'])
		address3 		= str(request.form['master_address3'])
		city 			= str(request.form['master_city'])
		state 			= str(request.form['master_state'])
		zip_code 		= str(request.form['master_zip_code'])
		email 			= str(request.form['master_email'])
		phone 			= str(request.form['master_phone'])
		monday 			= str(request.form['master_monday'])
		tuesday 		= str(request.form['master_tuesday'])
		wednesday 		= str(request.form['master_wednesday'])
		thursday 		= str(request.form['master_thursday'])
		friday 			= str(request.form['master_friday'])
		saturday 		= str(request.form['master_saturday'])
		sunday 			= str(request.form['master_sunday'])
		group_weekdays 	= str(request.form['master_group_weekdays'])
		group_weekends 	= str(request.form['master_group_weekends'])
		facebook_url 	= str(request.form['master_facebook_url'])
		twitter_url 	= str(request.form['master_twitter_url'])
		instagram_url 	= str(request.form['master_instagram_url'])
		show_facebook 	= str(request.form['master_show_facebook'])
		show_twitter 	= str(request.form['master_show_twitter'])
		show_instagram 	= str(request.form['master_show_instagram'])
		special_hours 	= str(request.form['master_special_hours'])
		hours_title 	= str(request.form['master_hours_title'])
		cash 			= str(request.form['master_cash'])
		visa 			= str(request.form['master_visa'])
		masctercard 	= str(request.form['master_mc'])
		amex 			= str(request.form['master_amex'])
		check 			= str(request.form['master_check'])
		cash 			= decodeJqueryBool(cash)
		amex 			= decodeJqueryBool(amex)
		masctercard 	= decodeJqueryBool(masctercard)
		visa 			= decodeJqueryBool(visa)
		check 			= decodeJqueryBool(check)
		group_weekdays 	= decodeJqueryBool(group_weekdays)
		group_weekends 	= decodeJqueryBool(group_weekends)
		show_facebook 	= decodeJqueryBool(show_facebook)
		show_instagram 	= decodeJqueryBool(show_instagram)
		show_twitter 	= decodeJqueryBool(show_twitter)
		special_hours 	= decodeJqueryBool(special_hours)
		company.address1 		= address1
		company.address2 		= address2
		company.address3 		= address3
		company.city 			= city
		company.state 			= state
		company.zip_code 		= zip_code
		company.email 			= email
		company.phone 			= phone
		company.address3 		= address3
		company.monday 			= monday
		company.tuesday 		= tuesday
		company.wednesday 		= wednesday
		company.thursday 		= thursday
		company.friday 			= friday
		company.saturday 		= saturday
		company.sunday 			= sunday
		company.group_weekdays 	= group_weekdays
		company.group_weekends 	= group_weekends
		company.facebook_url 	= facebook_url
		company.twitter_url 	= twitter_url
		company.instagram_url 	= instagram_url
		company.show_facebook 	= show_facebook
		company.show_twitter 	= show_twitter
		company.show_instagram 	= show_instagram
		company.special_hours 	= special_hours
		company.hours_title 	= hours_title
		for p in payments:
			method = str(p.method).lower()
			if method == "cash":
				p.is_accepted = cash
			elif method == "visa":
				p.is_accepted = visa
			elif method == "amex":
				p.is_accepted = amex
			elif method == "check":
				p.is_accepted = check
			elif method == "mastercard":
				p.is_accepted = masctercard
			p.save()
		company.save()
	elif target == "blog":
		b_id = str(request.form['target_id'])
		if isQueued("blog", b_id) == True:
			blog = get_blog_by_id(b_id)
			if action == "update":
				subject 		= str(request.form['editor_subject'])
				content 		= str(request.form['content'])
				blog.subject 	= subject
				blog.content 	= content
				blog.save()
			elif action == "delete":
				blog.delete()
		else:
			complete = False
	elif target == "product":		
		product 	= None
		name 		= None
		description = None
		price 		= None
		if action == "new" or action == "update":
			name 		= str(request.form['p_name'])
			description = str(request.form['p_description'])
			price 		= str(request.form['p_price'])
		if action == "new":
			product = Product(name, description, price)
			product.save()
		else:
			pid 	= str(request.form['target_id'])
			product = get_product_by_id(pid)
			if isQueued("product", pid) == True:
				if action == "delete":
					product.delete()
				elif action == "update":
					product.name 		= name
					product.description = description
					product.price 		= price
					product.save()
			else:
				complete = False
	elif target == "new_blog":
		subject = str(request.form['new_blog_subj'])
		content = str(request.form['new_blog_cont'])
		blog 	= Blog(subject, content)
		blog.save()
	elif target == "about":
		about 		= None
		statement 	= None
		is_active 	= True
		if action == "update" or action == "new":
			statement = str(request.form['master_a_statement'])
			is_active = str(request.form['m_is_active'])
			is_active = decodeBoolInteger(is_active)
		if action == "delete" or action == "update" or action == "swap":
			a_id 	= str(request.form['target_id'])
			if isQueued("about", a_id) == True:
				about 	= get_about_by_id(a_id)
				if action == "delete":
					about.delete()
				elif action == "swap":
					a_list = About.query.all()
					for a in a_list:
						a.is_active = False
						a.save()
					about.is_active = True
					about.save()
				elif action == "update":
					about.statement = statement
					about.is_active = is_active
					about.save()
			else:
				complete = False
		if action == "new":
			if is_active == True:
				a_list = About.query.all()
				for a in a_list:
					a.is_active = False
					a.save()
			about = About(statement)
			about.is_active = is_active
			about.save()
	elif target == "user":
		u_id = str(request.form["target_id"])
		if isQueued("user", u_id) == True:
			user = get_user_by_id(u_id)
			if user.is_locked == False:
				if action == "block":
					user.is_admin 			= False
					user.product_permission = False
					user.about_permission 	= False
					user.blog_permission 	= False
					user.gallery_permission = False
					user.save()
				elif action == "delete":
					user.delete()
				elif action == "update":
					product_permission 		= request.form['m_product']
					about_permission 		= request.form['m_about']
					blog_permission 		= request.form['m_blog']
					gallery_permission 		= request.form['m_gallery']
					is_admin 				= request.form['m_admin']
					user.product_permission = decodeBoolInteger(product_permission)
					user.about_permission 	= decodeBoolInteger(about_permission)
					user.blog_permission 	= decodeBoolInteger(blog_permission)
					user.gallery_permission = decodeBoolInteger(gallery_permission)
					user.is_admin 			= decodeBoolInteger(is_admin)
					user.save()
	elif target == "authorize":
		email = str(request.form["email"])
		auths = Authorization.query.all()
		users = User.query.all()
		for a in auths:
			if email == str(a.auth_email):
				complete = False
				break
		for u in users:
			if email == str(u.email):
				complete = False
				break
		if complete == True:
			fname = str(request.form["fname"])
			lname 			= str(request.form["lname"])
			auth_admin 		= decodeBoolInteger(request.form["is_admin"])
			auth_product 	= decodeBoolInteger(request.form["product_permission"])
			auth_about 		= decodeBoolInteger(request.form["about_permission"])
			auth_blog 		= decodeBoolInteger(request.form["blog_permission"])
			auth_gallery 	= decodeBoolInteger(request.form["gallery_permission"])
			name 			= fname + " " + lname
			authorizer		= Authorization(name, email, auth_admin, auth_blog, auth_product, auth_about, auth_gallery)
			authorizer.save()
	elif target == "reAuth":
		auth_id =str(request.form['target_id'])
		if isQueued("auth", auth_id) == True:
			auth 	= None
			aList 	= Authorization.query.all()
			for a in aList:
				if str(a.id) == auth_id:
					auth = a
					break
			code = generateRandomCode(8)
			# SEND A EMAIL TO USER HERE WITH THE NEW CODE
			auth.setCode(code)
	elif target == "image":
		if action == "upload":
			file 		= request.files['img_file']
			filename 	= images.save(file)
			url 		= images.url(filename)
			image 		= Image(url, filename)
			image.save()
		elif action == "delete":
			delete_list = str(request.form['target_id'])
			ids 		= delete_list.split('~')
			for i in ids:
				if len(i)> 0:
					if isQueued("image", i) == True:
						image = getImageById(i)
						image.delete()
	return complete























