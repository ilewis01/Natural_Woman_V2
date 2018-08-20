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

def fetch_user_by_email(email):
	user = None
	users = User.query.all()
	for u in users:
		if str(u.email) == email:
			user = u
			break
	return user

def loadSuperuser(user):
	url 				= "admin/master/adminAlt.html"
	data 				= {}
	data['users'] 		= {}
	data['blogs'] 		= {}
	data['products'] 	= {}
	data['images'] 		= {}
	data['payments']	= {}
	data['company'] 	= json_serialize_company()
	data['auths'] 		= {}
	data['questions']	= {}
	query_bl 			= 0
	query_ab 			= 0
	query_pr 			= 0
	query_im 			= 0
	query_pm 			= 0
	query_co 			= 0
	query_mx 			= 0
	query_sm 			= 0
	query_au 			= 0
	query_sq 			= 0
	query_uu 			= 0
	if user.is_registered == False:
		data['questions'] = json_serialize_security()
		url = "admin/master/completeRegistration.html"
	if user.blog_permission == True:
		data['blogs'] 	= json_serialize_blogs()
		query_bl 		= 1
	if user.product_permission == True:
		data['products'] 	= json_serialize_products()
		query_pr 			= 1
	if user.gallery_permission == True:
		data['images'] 	= json_serialize_gallery()
		query_im 		= 1
	if user.about_permission == True:
		query_ab 		= 1
	if user.is_admin == True:
		if user.is_locked == False and user.is_super == False:
			data['company'] = json_serialize_company()
			data['payments'] 	= json_serialize_payments()
			query_co = 1
			query_sm = 1
			query_pm = 1
		elif user.is_locked == True and user.is_super == False:
			data['users'] 		= json_serialize_users_all()
			data['payments'] 	= json_serialize_payments()
			data['auths'] 		= json_serialize_auths()
			query_au = 1
			query_co = 1
			query_sm = 1
			query_uu = 1
			query_pm = 1
		elif user.is_locked == True and user.is_super == True:
			data['users'] 		= json_serialize_users_all()
			data['payments'] 	= json_serialize_payments()
			data['auths'] 		= json_serialize_auths()
			data['questions']	= json_serialize_security()
			query_au = 1
			query_co = 1
			query_sm = 1
			query_uu = 1
			query_pm = 1
			query_sq = 1
			query_mx = 1
	data['c_user'] 			= user
	data['qblog'] 			= query_bl
	data['qabout'] 			= query_ab
	data['qproduct'] 		= query_pr
	data['qimage'] 			= query_im
	data['qpayment']		= query_pm
	data['qsocial']			= query_sm
	data['quserInclusive']	= query_uu
	data['qauth']			= query_au
	data['qsecurity'] 		= query_sq
	data['qcompany'] 		= query_co
	data['qmax'] 			= query_mx
	data['url'] 			= url
	data['altered'] 		= 0
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

def json_serialize_users_exclude(user):
	data 	= []
	index 	= 0
	users 	= User.query.all()
	users.reverse()
	for u in users:
		if str(u.id) != str(user.id):
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
		d['varies'] 		= str(p.varies)
		if index % 2 == 1:
			d['class'] = "li-shade1"
		else:
			d['class'] = "li-shade2"
		data.append(d)
		index += 1
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

def json_serialize_payments():
	data 		= []
	index 		= 0
	payments 	= Payment.query.all()
	payments.reverse()
	for p in payments:
		d = {}
		d['method'] 		= str(p.method).lower()
		d['is_accepted'] 	= str(p.is_accepted)
		d['icon'] 			= p.icon
		d['index'] 			= index
		d['id'] 			= p.id
		if index % 2 == 1:
			d['class'] 		= "li-shade1"
		else:
			d['class'] 		= "li-shade2"
		index += 1
		data.append(d)
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

def json_serialize_auths():
	data = []
	index = 0
	auths = Authorization.query.all()
	auths.reverse()
	for a in auths:
		d = {}
		d['index'] 		= index
		d['name'] 		= a.auth_name
		d['email'] 		= a.auth_email
		d['admin'] 		= str(a.auth_admin)
		d['product'] 	= str(a.auth_product)
		d['about'] 		= str(a.auth_about)
		d['blog'] 		= str(a.auth_blog)
		d['image'] 		= str(a.auth_gallery)
		d['lock'] 		= str(a.auth_locked)
		d['super'] 		= str(a.auth_super)
		d['id'] 		= a.id
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
	questions.reverse()
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

def json_serialize_image_data():
	data				= {}
	company				= get_company_model()
	data['max_images']	= company.max_images
	data['num_images']	= company.num_uploads
	return data

def get_company_model():
	companies = Company.query.all()
	return companies[0]

def isEmptyMember(literal):
	literal = str(literal)
	if literal==None or literal=="" or literal=="null" or len(literal)==0 or literal=="None":
		literal = "empty"
	return literal

def queryAbouts():
	data 	= []
	index 	= 0
	abouts 	= About.query.all()
	abouts.reverse()
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

def que(m_type, m_id):
	que 			= {}
	que['isQueued'] = False
	que['item'] 	= None
	models 	= None
	if m_type == "blog":
		models = Blog.query.all()
	elif m_type == "product":
		models = Product.query.all()
	elif m_type == "image":
		models = Image.query.all()
	elif m_type == "user":
		models = User.query.all()
	elif m_type == "auth":
		models = Authorization.query.all()
	elif m_type == "security":
		models = SecurityQuestion.query.all()
	elif m_type == "payment":
		models = Payment.query.all()
	elif m_type == "about":
		models = About.query.all()
	for m in models:
		if str(m_id) == str(m.id):
			que['isQueued'] = True
			que['item'] = m
			break
	return que

def decodeID(m_id):
	d_list 	= []
	parts 	= m_id.split("~")
	for p in parts:
		if len(p) != 0:
			d_list.append(p)
	return d_list

def decodeBool(val):
	result = False
	if (str(val) == "True"):
		result = True
	return result

def userExist(email):
	u_list 	= User.query.all()
	exist 	= False
	email 	= str(email)
	for u in u_list:
		if str(u.email) == email:
			exist = True
			break
	return exist

def authExist(email):
	a_list 	= Authorization.query.all()
	exist 	= False
	email 	= str(email)
	for a in a_list:
		if str(a.auth_email) == email:
			exist = True
			break
	return exist

def locateAuth(email):
	a_list 	= Authorization.query.all()
	auth 	= None
	email 	= str(email)
	for a in a_list:
		if str(a.auth_email) == email:
			auth = a
			break
	return auth

def fetchSecurityById(s_id):
	sec = None
	s_list = SecurityQuestion.query.all()
	for s in s_list:
		if str(s.id) == str(s_id):
			sec = s
			break
	return sec

def clearAboutStatements():
	a_list = About.query.all()
	for a in a_list:
		a.is_active = False
		a.save()

def getAccessList(auth):
	a_list = []
	if auth.auth_admin == True:
		a_list.append("Administrative permission")
	if auth.auth_product == True:
		a_list.append("Permission to edit Natural Woman Salon products")
	if auth.auth_about == True:
		a_list.append("Permission to edit the ABout Us statement")
	if auth.auth_blog == True:
		a_list.append("Permission to edit blogs")
	if auth.auth_gallery == True:
		a_list.append("Permission to edit the photo gallery")
	return a_list

def sendUserAuthorization(auth, mode):
	# Remember top change sender information when in production
	code = generateRandomCode(8)
	perm = getAccessList(auth)
	subject = "Message from Natural Woman Salon"
	sender = "redd.app.dev@gmail.com"
	recipient = auth.auth_email
	text = auth.auth_name + ",\n"
	text += "You have been given access to the Natural Woman Salon website administration page. \n"
	text += "The following permissions have been granted: \n\n"
	for p in perm:
		text += p
		text += "\n"
	text += "\nplease visit register@naturalwomansalon.com and enter the acceess code provided below to complete your registration. \n"
	text += "Access Code: " + code + "\n"
	text += "We look forward to your input and extertise \n"
	text += "NWS web services"
	html = auth.auth_name + ",<br>"
	html += "<div>You have been given access to the Natural Woman Salon website administration page.</div>"
	html += "The following permissions have been granted:"
	html += "<ul>"
	for p in perm:
		html += "<li>"
		html += p
		html += "</li>"
	html += "</ul>"
	html += "Please visit register@naturalwomansalon.com and enter the acceess code provided below to complete your registration. <br>"
	html += "<b><em>Access Code:</em></b> " + code + "<br>"
	html += "We look forward to your input and extertise <br>"
	html += "NWS web services"
	if mode == "dev":
		print(text)
	else:
		send_email(subject, sender, recipient, text, html)
	auth.setCode(code)

def sendPasswordReset(user, mode):
	code 		= generateRandomCode(10)
	subject 	= "Natural Woman Salon Password Reset"
	sender 		= "redd.app.dev@gmail.com"
	recipient 	= user.email
	text 		= "Hello " + user.fname + ",\n"
	html 		= "Hello " + user.fname + ",<br>"
	text += "Our records indicate that you have requested a password reset.\n"
	html += "<div>Our records indicate that you have requested a password reset.</div>"
	text += "If you did not make this request, please contact us at info@naturalwomansalon.com.\n"
	html += "<div>If you did not make this request, please contact us at info@naturalwomansalon.com.</div>"
	text += "Otherwise, copy the security link below and visit naturalwomansalon.com/validateIdentity to reset your password."
	html += "<div>Otherwise, copy the security link below and visit naturalwomansalon.com/validateIdentity to reset your password.</div>"
	text += "SECURITY CODE: "
	text += code
	text += "\n\n"
	html += "<div><b>SECURITY CODE: </b>"
	html += code
	html += "</div><br>"
	text += "NWS web services"
	html += "NWS web services"
	if mode == "dev":
		print(text)
	else:
		send_email(subject, sender, recipient, text, html)
	recovery = newRecovery(user.email, code)

def send_email(subject, sender, recipients, text_body, html_body):
	msg = Message(subject, sender=sender, recipients=recipients)
	msg.body = text_body
	msg.html = html_body
	mail.send(msg)

def recoveryExist(email):
	exist = False
	r_list = Recovery.query.all()
	for r in r_list:
		if str(email) == str(r.target_email):
			exist = True
			break
	return exist

def newRecovery(email, code):
	item = None
	if recoveryExist(email) == False:
		item = Recovery(email, code)
		item.save()
	else:
		r_list = Recovery.query.all()
		for r in r_list:
			if str(email) == str(r.target_email):
				r.setCode(code)
				r.save()
				break
	return item

def alterDb(user, action):
	model 	= request.form['target_model']
	action 	= None
	m_id 	= None
	m1 		= None
	if model == "blog":
		action = request.form['target_action']
		if action == "0":
			m1 = "A new blog has been posted"
			subject = request.form['subject']
			content = request.form['content']
			blog 	= Blog(subject, content)
			blog.save()
		elif action == "1":
			m_id 	= decodeID(request.form['target_id'])
			queued 	= que(model, m_id)
			if queued['isQueued'] == True:
				m1 = "Blog post successfully updated"
				subject = request.form['subject']
				content = request.form['content']
				blog 	= queued['item']
				blog.subject = subject
				blog.content = content
				blog.save()
			else:
				m1 = "Unsuccessful blog update"
		elif action == "2":
			m_id = decodeID(request.form['target_id'])
			if len(m_id) == 0:
				m1 = "Blog successfully deleted"
			else:
				m1 = "Blogs successfully deleted"
			for m in m_id:
				queued = que(model, m)
				if queued['isQueued'] == True:
					queued['item'].delete()
	elif model == "product":
		action = request.form['target_action']
		if action == "0":
			m1 			= "New product successfully created"
			name 		= request.form['name']
			description = request.form['description']
			price 		= request.form['price']
			varies 		= decodeBool(request.form['f_varies'])
			product 	= Product(name, description, price, varies)
			product.save()
		elif action == "1":
			m1 	 	= "Product successfully updated"
			m_id 	= decodeID(request.form['target_id'])
			m_id 	= m_id[0]
			queued 	= que(model, m_id)
			if queued['isQueued'] == True:
				name 				= request.form['name']
				description 		= request.form['description']
				price 				= request.form['price']
				varies 				= decodeBool(request.form['f_varies'])
				product 			= queued['item']
				product.name 		= name
				product.description = description
				product.price 		= price
				product.varies 		= varies
				product.save()
		elif action == "2":
			m_id = decodeID(request.form['target_id'])
			if len(m_id) == 0:
				m1 = "Product sucessfullt deleted"
			else:
				m_id = "Products successfully deleted"
			for m in m_id:
				queued = que(model, m)
				if queued['isQueued'] == True:
					queued['item'].delete()
	elif model == "image":
		action = request.form['target_action']
		if action == "0":
			m1 			= "Image sucessfully uploaded"
			file 		= request.files['img_filename']
			filename 	= images.save(file)
			url 		= images.url(filename)
			image 		= Image(url, filename)
			company 	= get_company_model()
			num_uploads = company.num_uploads + 1
			company.num_uploads = num_uploads
			image.save()
			company.save()
		elif action == "2":
			company 	= get_company_model()
			num_uploads = company.num_uploads
			m_id = decodeID(request.form['target_id'])
			if len(m_id) == 0:
				m1 = "Image successfully deleted"
			else:
				m1 = "Images successfully deleted"
			for m in m_id:
				q = que(model, m)
				if q['isQueued'] == True:
					q['item'].delete()
					num_uploads -= 1
			company.num_uploads = num_uploads
			company.save()
	elif model == "permission":
		action = request.form['target_action']
		if action == "0":
			m1 			= "New user successfully created"
			email 		= request.form['email1']
			emailExist 	= userExist(email)
			if emailExist == False:
				admin 		= decodeBool(request.form['is_admin'])
				product 	= decodeBool(request.form['product_permission'])
				about 		= decodeBool(request.form['about_permission'])
				blog 		= decodeBool(request.form['blog_permission'])
				gallery 	= decodeBool(request.form['gallery_permission'])
				locked 		= decodeBool(request.form['is_locked'])
				is_super 	= decodeBool(request.form['is_super'])
				fname 		= request.form['f_fname']
				lname 		= request.form['f_lname']
				password 	= "1234"
				u 						= User(fname, lname, email, password)
				u.is_admin 				= admin
				u.product_permission 	= product
				u.about_permission 		= about
				u.blog_permission 		= blog
				u.gallery_permission 	= gallery
				u.is_locked 			= locked
				u.is_super 				= is_super
				u.save()
		elif action == "1":
			m_id = request.form['target_id']
			q = que("user", m_id)
			if q['isQueued'] == True:
				u = q['item']
				m1 = "User permissions successfully updated for: " + u.name()
				admin 		= decodeBool(request.form['is_admin'])
				product 	= decodeBool(request.form['product_permission'])
				about 		= decodeBool(request.form['about_permission'])
				blog 		= decodeBool(request.form['blog_permission'])
				gallery 	= decodeBool(request.form['gallery_permission'])
				locked 		= decodeBool(request.form['is_locked'])
				is_super 	= decodeBool(request.form['is_super'])
				u.setPermissions(admin, product, about, blog, gallery)
				if locked == True:
					u.setLocKed()
				if is_super == True:
					u.setSuperuser()
		elif action == "2":
			m_id = decodeID(request.form['target_id'])
			if len(m_id) == 0:
				m1 = "User successfully deleted"
			else:
				m1 = "Users successfully deleted"
			for m in m_id:
				q = que("user", m)
				if q['isQueued'] == True:
					q['item'].delete()
	elif model == "auth":
		# REMEMBER TO CHANGE AUTHORIZATION TO prod IN PRODUCTION
		action = request.form['target_action']
		if action == "0":
			users 	= User.query.all()
			auths 	= Authorization.query.all()
			email 	= str(request.form['email1'])
			uExist 	= userExist(email)
			aExist 	= authExist(email)
			m1 		= "New authorization sent to: " + str(email)
			if uExist == False and aExist == False:
				fname 		= request.form['f_fname']
				lname 		= request.form['f_lname']
				admin 		= decodeBool(request.form['is_admin'])
				product 	= decodeBool(request.form['product_permission'])
				about 		= decodeBool(request.form['about_permission'])
				blog 		= decodeBool(request.form['blog_permission'])
				gallery 	= decodeBool(request.form['gallery_permission'])
				locked 		= decodeBool(request.form['is_locked'])
				is_super 	= decodeBool(request.form['is_super'])
				name 		= str(fname) + " " + str(lname)
				au 			= Authorization(name, email, admin, blog, product, about, gallery)
				au.save()
				sendUserAuthorization(au, "dev")
			else:
				if uExist == True:
					m1 = "This user already has an active account"
				if aExist == True:
					m1 = "A authorization has already been sent to this user. "
		else:
			m_id = request.form['target_id']
			if action == "1":
				m1 = "Authorization request successfully updated"
				q = que(model, m_id)
				if q['isQueued'] == True:
					admin 		= decodeBool(request.form['is_admin'])
					product 	= decodeBool(request.form['product_permission'])
					about 		= decodeBool(request.form['about_permission'])
					blog 		= decodeBool(request.form['blog_permission'])
					gallery 	= decodeBool(request.form['gallery_permission'])
					locked 		= decodeBool(request.form['is_locked'])
					is_super 	= decodeBool(request.form['is_super'])
					q['item'].auth_admin 	= admin
					q['item'].auth_product 	= product
					q['item'].auth_blog 	= blog
					q['item'].auth_about 	= about
					q['item'].auth_gallery 	= gallery
					q['item'].auth_locked 	= locked
					q['item'].auth_super 	= is_super
					q['item'].save()
			elif action == "2":
				m_id = decodeID(m_id)
				if len(m_id) == 0:
					m1 = "Authorization successfully deleted"
				else:
					m1 = "Authorizations successfully deleted"
				for m in m_id:
					q = que(model, m)
					if q["isQueued"] == True:
						q['item'].delete()
			elif action == "3":
				m1 = "A new authorization code has been sent to: " + str(email)
				q = que(model, m_id)
				if q["isQueued"] == True:
					sendUserAuthorization(q['item'], "dev")
	elif model == "security":
		action = request.form['target_action']
		if action == "0":
			m1 			= "New security question created"
			question 	= request.form['question']
			sec 		= SecurityQuestion(question)
			sec.save()
		else:
			m_id = request.form['target_id']
			m1 = "Security question successfully updated"
			if action == "1":
				q = que(model, m_id)
				if q["isQueued"] == True:
					q['item'].question = request.form['question']
					q['item'].save()
			elif action == "2":
				m_id = decodeID(m_id)
				if len(m_id) == 0:
					m1 = "Security question successfully deleted"
				else:
					m1 = "Security questions successfully deleted"
				for m in m_id:
					s = fetchSecurityById(m)
					if s != None:
						s.delete()
	elif model == "address":
		m1 			= "Address successfully updated"
		address1 	= request.form['address1']
		address2 	= request.form['address2']
		address3 	= request.form['address3']
		city 		= request.form['city']
		state 		= request.form['state']
		zip_code 	= request.form['zip_code']
		company 	= get_company_model()
		if len(address1) == 0:
			address1 = "empty"
		if len(address2) == 0:
			address2 = "empty"
		if len(address3) == 0:
			address3 = "empty"
		company.address1 	= address1
		company.address2 	= address2
		company.address3 	= address3
		company.city 		= city
		company.state 		= state
		company.zip_code 	= zip_code
		company.save()
	elif model == "phone":
		m1 		= "NWS Phone number successfully updated"
		area 	= request.form['area']
		pref 	= request.form['prefix']
		post 	= request.form['postfix']
		phone 	= "(" + area + ") " + pref + "-" + post
		company = get_company_model()
		company.phone = phone
		company.save() 
	elif model == "email":
		m1 				= "NWS email address successfully updated"
		email 			= request.form['email']
		company 		= get_company_model()
		company.email 	= email
		company.save()
	elif model == "max_images":
		max_images 			= int(request.form['max_images'])
		company 			= get_company_model()
		company.max_images 	= max_images
		m1 					= "The maximum allowed uploads have been set at: " + str(max_images)
		company.save()
	elif model == "facebook":
		m1 						= "The facebook link has been successfully updated"
		facebook_url 			= request.form['facebook_url']
		show_facebook			= decodeBool(request.form['link_on'])
		company 				= get_company_model()
		company.facebook_url 	= facebook_url
		company.show_facebook 	= show_facebook
		company.save()
	elif model == "twitter":
		twitter_url 			= request.form['twitter_url']
		show_twitter			= decodeBool(request.form['link_on'])
		company 				= get_company_model()
		company.twitter_url 	= twitter_url
		company.show_twitter 	= show_twitter
		m1 						= "The twitter link has been successfully updated"
		company.save()
	elif model == "instagram":
		instagram_url 			= request.form['instagram_url']
		show_instagram			= decodeBool(request.form['link_on'])
		company 				= get_company_model()
		company.instagram_url 	= instagram_url
		company.show_instagram 	= show_instagram
		m1 						= "The instagram link has been successfully updated"
		company.save()
	elif model == "change_name":
		password = request.form['password']
		if user.password_validated(password) == True:
			m1 	  = "Your account name has been successfully changed"
			fname = request.form['fname']
			lname = request.form['lname']
			user.fname = fname
			user.lname = lname
			user.save()
		else:
			m1 = "The password that you entered was not correct"
	elif model == "change_email":
		password = request.form['password']
		if user.password_validated(password) == True:
			email = request.form['email1']
			if userExist(email) == False:
				m1 			= "Account login email address successfully updated"
				user.email 	= email
				user.save()
			else:
				m1 = "There is already an account associated with the email address that you've entered"
		else:
			m1 = "The password that you entered was not correct"
	elif model == "change_password":
		password = request.form['curr_password']
		if user.password_validated(password) == True:
			m1 = "You password was successfully updated"
			p1 = request.form['password1']
			user.set_password(p1)
			user.save()
		else:
			m1 = "The password that you entered was not correct"
	elif model == "payment":
		action = request.form['target_action']
		if action == "update":
			m_id = request.form['target_id']
			q = que("payment", m_id)
			if q['isQueued'] == True:
				payment = q['item']
				m1 = str(payment.method).upper() + " payment method successfully "
				if payment.is_accepted == True:
					payment.is_accepted = False
					m1 += " disabled"
				elif payment.is_accepted == False:
					payment.is_accepted = True
					m1 += "enabled"
				payment.save()
		elif action == "icon":
			m_id = request.form['target_id']
			q = que("payment", m_id)
			if q['isQueued'] == True:
				payment = q['item']
				method 			= request.form['m_payment_method']
				icon 			= request.form['m_payment_icon']
				m1 				= str(method).upper() + " payment method sucessfully updated"
				payment.method 	= method
				payment.icon 	= icon
				payment.save()
		elif action == "delete":
			m_id = request.form['target_id']
			q = que("payment", m_id)
			if q['isQueued'] == True:
				pname = q['item'].method
				q['item'].delete()
				m1 = pname + " payment method successfully deleted"
		elif action == "new":
			addThis = True
			method 	= request.form['m_payment_method']
			method 	= str(method).lower()
			p_list 	= Payment.query.all()
			for p in p_list:
				if str(p.method) == str(method):
					addThis = False
					break
			if addThis == False:
				m1 = str(method).upper() + " already exist"
			else:
				icon 	= request.form['m_payment_icon']
				payment = Payment(method, icon)
				m1 = method.upper() + " payment method successfully added"
				payment.save()
	elif model == "about":
		phrase = "";
		action = request.form['target_action']
		if action == "new":
			statement 	= request.form['statement']
			is_active 	= decodeBool(request.form['is_active'])
			about 		= About(statement)
			about.save()
			if is_active == True:
				phrase = "active"
				clearAboutStatements()
				about.is_active = True
				about.save()
			else:
				phrase = "inactive"
				about.is_active = False
				about.save()
			m1 = "A new " + phrase + " about statement has beenh created"
		elif action == "update":
			m_id = request.form['target_id']
			q = que(model, m_id)
			if q["isQueued"] == True:
				statement = request.form['statement']
				is_active = decodeBool(request.form['is_active'])
				if is_active == True:
					clearAboutStatements()
					phrase = "active"
					q['item'].statement = statement
					q['item'].is_active = True
					q['item'].save()
				else:
					phrase = "inactive"
					q['item'].statement = statement
					q['item'].is_active = False
					q['item'].save()
				m1 = "Successfully updated " + phrase + " about statement"
		elif action == "2":
			m_id = decodeID(request.form['target_id'])
			phrase = "statement"
			if len(m_id) != 1:
				phrase = "statements"
			for m in m_id:
				q = que(model, m)
				if q["isQueued"] == True:
					q['item'].delete()
			m1 = "Successfully deleted " + str(len(m_id)) + " \"<em><b>About Us</b></em>\" " + phrase
	elif model == "hours":
		m1 				= "Business hours have been successfully updated"
		company 		= get_company_model()
		group_weekdays 	= decodeBool(request.form['group_weekdays'])
		group_weekends 	= decodeBool(request.form['group_weekends'])
		special_hours  	= decodeBool(request.form['special_check'])
		mon 			= request.form['monday_open'] + request.form['s_open_mon'] + "-" + request.form['monday_close'] + request.form['s_close_mon']
		tue 			= 'empty'
		wed 			= 'empty'
		thu 			= 'empty'
		fri 			= 'empty'
		sat 			= request.form['saturday_open'] + request.form['s_open_sat'] + "-" + request.form['saturday_close'] + request.form['s_close_sat']
		sun 			= 'empty'
		title 			= "Hours of Operation"
		if group_weekdays == False:
			tue = request.form['tuesday_open'] + request.form['s_open_tue'] + "-" + request.form['tuesday_close'] + request.form['s_close_tue']
			wed = request.form['wednesday_open'] + request.form['s_open_wed'] + "-" + request.form['wednesday_close'] + request.form['s_close_wed']
			thu = request.form['thursday_open'] + request.form['s_open_thu'] + "-" + request.form['thursday_close'] + request.form['s_close_thu']
			fri = request.form['friday_open'] + request.form['s_open_fri'] + "-" + request.form['friday_close'] + request.form['s_close_fri']
		if group_weekends == False:
			sun = request.form['sunday_open'] + request.form['s_open_sun'] + "-" + request.form['sunday_close'] + request.form['s_close_sun']
		if special_hours == True:
			title = request.form['k_special_hours_input']
		company.monday 			= mon
		company.tuesday 		= tue
		company.wednesday 		= wed
		company.thursday 		= thu
		company.friday 			= fri
		company.saturday 		= sat
		company.sunday 			= sun
		company.group_weekdays 	= group_weekdays
		company.group_weekends 	= group_weekends
		company.special_hours 	= special_hours
		company.hours_title 	= title
		company.save()
	elif model == "registration":
		m1 = "Registration Complete!"
		sq1 = request.form['sq1']
		sq2 = request.form['sq2']
		an1 = request.form['answer1']
		an2 = request.form['answer2']
		q = que("user", user.id)
		if q["isQueued"] == True:
			q['item'].setSecurity(sq1, sq2, an1, an2)
	data = loadSuperuser(user);
	data['altered'] = 1
	data['message'] = m1
	data['model'] 	= model
	return data

def getSecurityContent():
	data 			= {}
	data['user'] 	= None
	data['message'] = None
	data['url'] 	= "admin/master/launchSecure.html"
	data['located'] = False
	email 			= request.form['sec_email']
	if userExist(email) == True:
		u_list = User.query.all()
		for u in u_list:
			if str(u.email) == str(email):
				data['located'] = True
				data['user'] = u
				break
	else:
		data['message'] = "No account found for<b>"+ str(email)
		data['url'] 	= "admin/master/noAccount.html"
	return data

def validateIdentityContent():
	#REMEMBER TO SET SENDING EMAIL TO "PROD" IN PRODUCTION 
	data 	= {}
	u_id 	= request.form['u_id']
	answer1 = request.form['answer1']
	answer2 = request.form['answer2']
	q 		= que("user", u_id)
	if q["isQueued"] == True:
		user 			= q["item"]
		data['user'] 	= user
		validated = user.securityCleared(answer1, answer2)
		if validated == True:
			data['url'] = "admin/master/loginReset.html"
			sendPasswordReset(user, 'dev')
		else:
			data['url'] = "admin/master/identificalionFailed.html"
	return data

def fetchUserRecovery(email):
	item 	= None
	r_list 	= Recovery.query.all()
	for r in r_list:
		if str(email) == str(r.target_email):
			item = r
			break
	return item

def hasRecovery(email):
	exist = False
	r_list = Recovery.query.all()
	for r in r_list:
		if str(email) == str(r.target_email):
			exist = True
			break
	return exist

def recoverySuccessContent():
	data 		= {}
	message  	= ""
	url 		= "admin/master/resetSuccess.html"
	email 		= request.form['email']
	password 	= request.form['password1']
	code 		= request.form['code']
	if hasRecovery(email) == True:
		recovery = fetchUserRecovery(email)
		validate = recovery.validate(code)
		if validate == True:
			user = fetch_user_by_email(email)
			user.set_password(password)
			recovery.delete()
			message = "You have successfully updated your password"
		else:
			message = "The security code that you've entered is incorrect"
			url 	= "admin/master/resetFailure.html"
	else:
		message = "The email that you entered is not queued for a password reset"
		url 	= "admin/master/resetFailure.html"
	data['url'] = url
	data['message'] = message
	return data

def getRegistrationContent():
	data = {}
	message = None
	url = "global/validateRegistration.html"
	email = request.form['email']
	exist = authExist(email)
	if exist == False:
		url = "global/validationFailure.html"
		message = "No Authorization Exist For Email: " + email
	else:
		auth  = locateAuth(email)
		code  = request.form['security_code']
		valid = auth.validate(code)
		if valid == False:
			message = "The Authorization Code You Entered Is Invalid"
			url = "global/validationFailure.html"
		else:
			exist = userExist(email)
			if exist == True:
				message = "An Account Already Exists For This User"
				url = "global/validationFailure.html"
			else:
				fname = request.form['fname']
				lname = request.form['lname']
				ans_1 = request.form['answer1']
				ans_2 = request.form['answer2']
				ques1 = request.form['question1']
				ques2 = request.form['question2']
				passw = request.form['password1']
				user  = User(fname, lname, email, passw)
				user.setPermissions(auth.auth_admin, auth.auth_product, auth.auth_about, auth.auth_blog, auth.auth_gallery)
				user.is_locked 	= auth.auth_locked
				user.is_super 	= auth.auth_super
				user.setSecurity(ques1, ques2, ans_1, ans_2)
				user.save()
				auth.delete()
				message = "Registration Complete!"
	data['url'] = url
	data['message'] = message
	data['security'] = SecurityQuestion.query.all()
	return data

def fetchNavigationContent():
	data = {}
	company = get_company_model()
	data['show_facebook'] = company.show_facebook
	data['show_twitter'] = company.show_twitter
	data['show_instagram'] = company.show_instagram
	return data

def getAboutContent():
	data = fetchNavigationContent()
	a_list = About.query.all()
	data['title'] = "Natural Woman Salon | About Us"
	data['url'] = "global/about.html"
	data['index'] = 1
	for a in a_list:
		if a.is_active == True:
			data['about'] = a
			break
	return data

def getImageGallery():
	images 	= Image.query.all();
	data 	= []
	pre 	= "bu"
	count 	= 1
	images.reverse()
	for i in images:
		d = {}
		d["id"] = i.id
		d['query'] = pre + str(count)
		d['url'] = i.img_url
		data.append(d)
		count += 1
	return data

def getGalleryContent():
	data 			= fetchNavigationContent()
	data['title'] 	= "Natural Woman Salon | Photo Gallery"
	data['url'] 	= "global/gallery.html"
	images 			= getImageGallery()
	data['images'] 	= images
	data['d_size'] 	= len(images)
	data['index'] 	= 2
	return data

def fetchProductLoaders():
	data 		= []
	products 	= Product.query.all()
	count 		= 0
	for p in products:
		d = {}
		d['name'] 			= p.name
		d['description'] 	= p.description
		d['price'] 			= p.price
		d['index'] 			= count
		d['class'] 			= "p-class-" + str(count % 5)
		data.append(d)
		count += 1
	return data

def getProductContent():
	products 			= fetchProductLoaders()
	d_size 				= len(products)
	data 				= fetchNavigationContent()
	data['title'] 		= "Natural Woman Salon | Services"
	data['url'] 		= "global/products.html"
	data['products'] 	= products
	data['d_size'] 		= d_size
	data['index'] 		= 3
	return data

def getBlogContent():
	data = fetchNavigationContent()
	data['title'] = "Natural Woman Salon | Lora's Blog"
	data['url'] = "global/blog.html"
	data['blogs'] = Blog.query.all()
	data['index'] = 4
	return data

def getContactContent():
	data = fetchNavigationContent()
	data['title'] = "Natural Woman Salon | Contact Us"
	data['url'] = "global/contact.html"
	data['company'] = get_company_model()
	data['index'] = 5
	return data






































