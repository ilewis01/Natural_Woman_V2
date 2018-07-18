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
		d['is_admin'] 			= str(u.is_admin)
		d['product_permission'] = str(u.product_permission)
		d['about_permission'] 	= str(u.about_permission)
		d['blog_permission'] 	= str(u.blog_permission)
		d['gallery_permission'] = str(u.gallery_permission)
		d['index'] 				= index
		data.append(d)
		index += 1
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
		index += 1
		data.append(d)
	return data

def isEmptyMember(literal):
	literal = str(literal)
	print("LITERAL VALUE: " + literal)
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

def get_user_json_data():
	data 				= {}
	users 				= json_serialize_users()
	data['active'] 		= users
	data['inactive'] 	= []
	return data

def get_gallery_json_data():
	data = {}
	data['active'] = []
	data['inactive'] = []
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
	content['json_data'] 		= get_user_json_data()
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
		content['json_data'] 	= get_empty_json_data()
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
	target_model 	= str(request.form['target_model'])
	# target_action 	= str(target_action)
	fetch_target_fields(target_model)
	# REMEMBER TO CHANGE THE ABOUT ICON ONCE COMPLETED IN CSS
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
		target_action 	= str(target_action)
		header 			= "Manage Products & Pricing"
		json_data 		= get_product_json_data()
		index 			= 8
		if target_action == "delete":
			message = "Product Successfully Deleted"
		elif target_action == "edit":
			message = "Productt Successfully Updated"
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
			message = "A New About Statement Has Been Created"
		elif target_action == "delete":
			message = "The Selected Statement Has Been Deleted"
	elif target_model == "gallery":
		header 		= "Manage Gallery Images"
		index 		= 10
		json_data 	= get_empty_json_data()
		if target_action == "delete":
			message = "Image Successfully Deleted"
		elif target_action == "save":
			message = "Image Successfully Saved"


	elif target_model == "company":
		header 		= "Contact & Company Profile"
		message 	= "Company Profile Successfully Updated"
		json_data 	= get_company_content()
		index 		= 11



	elif target_model == "user":
		header 		= "User Management"
		json_data 	= get_user_json_data()
		index 		= 12
		if target_action == "update":
			message = "User Privileges Sucessfully Updated"
		elif target_action == "block":
			message = "User Privileges Successfully Blocked"
		elif target_action == "delete":
			message = "User Successfully Deleted"
	elif target_model == "authorize":
		header 		= "Authorize New User"
		message 	= "The Authorization Code Has Been Sent"
		json_data 	= get_empty_json_data()
		index 		= 13

	content['user'] 		= user
	content['icon'] 		= icon
	content['header'] 		= header
	content['message'] 		= message
	content['json_data'] 	= json_data
	content['btn_index'] 	= index
	content['is_edited'] 	= 1
	content['title']		= "Natural Woman Salon | Administration"
	return content

def decodeJqueryBool(val):
	result = True
	val = str(val)
	if val == "False":
		result = False
	return result

def fetch_target_fields(target):
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



	# if target == "new_blog":
	# 	subject = str(request.form['subject'])
	# 	content = str(request.form['blog_content'])
	# 	model 	= Blog(subject, content)
	# 	message = "A New Blog Has Been Successfully Added"
	# 	model.save()
	# 	data['model'] = "blog"
	# elif target == "blog":
	# 	data['model'] = "blog"
	# 	action = str(request.form['target_action'])
	# 	model_id = str(request.form['target_id'])
	# 	model = get_blog_by_id(model_id)
	# 	if action == "delete":
	# 		model.delete()
	# 		message = "Blog Post Successfully Deleted"
	# 	elif action == "update":
	# 		model.subject = str(request.form["subject"])
	# 		model.content = str(request.form["content"])
	# 		model.save()
	# 		message = "Blog Post Successfully Updated"
	# elif target == "product":
	# 	data['model'] = "product"
	# 	action = str(request.form['target_action'])
	# 	if action == "delete":
	# 		model_id 	= str(request.form['target_id'])
	# 		model 		= get_product_by_id(model_id)
	# 		message 	= "Blog Post Successfully Deleted"
	# 		model.delete()
	# 	elif action == "edit":
	# 		model_id 	= str(request.form['target_id'])
	# 		model 		= get_product_by_id(model_id)
	# 		name 		= str(request.form['name'])
	# 		description = str(request.form['description'])
	# 		price 		= str(request.form['price'])
	# 		if len(name) != 0:
	# 			model.name = name
	# 		if len(description) != 0:
	# 			model.description = description
	# 		if len(price) != 0:
	# 			model.price = int(price)
	# 		model.save()
	# 	elif action == "new":
	# 		name 		= str(request.form['name'])
	# 		description = str(request.form['description'])
	# 		price 		= str(request.form['price'])
	# 		model 		= Product(name, description, price)
	# 		model.save()
	# elif target == "about":
	# 	data['model'] = "about"
	# 	action = str(request.form['target_action'])
	# 	if action == "new":
	# 		statement 		= str(request.form['statement'])
	# 		is_active 		= str(request.form['m_is_active'])
	# 		model 			= About(statement)
	# 		model.is_active = decode_checkbox(is_active)
	# 		message 		= "A New About Us Statement Has Been Created"
	# 		if is_active == "1":
	# 			set_active(model)
	# 		model.save()
	# 	elif action == "update":
	# 		statement 	= str(request.form['statement'])
	# 		is_active 	= str(request.form['m_is_active'])
	# 		model_id 	= str(request.form['target_id'])
	# 		model 		= get_about_by_id(model_id)
	# 		if len(statement) != 0:
	# 			model.statement = statement
	# 			model.is_active = decode_checkbox(is_active)
	# 			if is_active == "1":
	# 				set_active(model)
	# 		message = "About Us Statement Successfully Updated"
	# 		model.save()
	# 	elif action == "swap":
	# 		model_id 	= str(request.form['target_id'])
	# 		model 		= get_about_by_id(model_id)
	# 		message = "The About Us Statement Has Been Successfully Changed"
	# 		set_active_exclusive(model)
	# 		model.is_active = True
	# 		model.save()
	# 	elif action == "delete":
	# 		model_id 	= str(request.form['target_id'])
	# 		model 		= get_about_by_id(model_id)
	# 		message 	= "The Selected Statement Has Been Deleted"
	# 		model.delete()




















