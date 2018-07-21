
from . import db, bcrypt
from datetime import datetime

class User(db.Model):
	__tablename__ 		= "users"
	id 					= db.Column('id', db.Integer, primary_key=True, autoincrement=True)
	fname 				= db.Column('fname', db.String(120), nullable=False)
	lname 				= db.Column('lname', db.String(120), nullable=False)
	email 				= db.Column('email', db.String(120), nullable=False, unique=True)
	password 			= db.Column('password', db.Binary(60), nullable=False)
	authenticated 		= db.Column('authenticated', db.Boolean, default=False)
	is_admin 			= db.Column('is_admin', db.Boolean, default=False)
	product_permission 	= db.Column('product_permission', db.Boolean, default=False)
	about_permission 	= db.Column('about_permission', db.Boolean, default=False) 
	blog_permission 	= db.Column('blog_permission', db.Boolean, default=False)
	gallery_permission 	= db.Column('gallery_permission', db.Boolean, default=False)
	is_locked 			= db.Column('locked', db.Boolean, default=False)
	superuser 			= db.Column('superuser', db.Boolean, default=False)

	def __init__(self, fname, lname, email, plaintext_password):
		self.fname = fname
		self.lname = lname
		self.email = email
		self.password = bcrypt.generate_password_hash(plaintext_password)
		# self.set_permissions()

	def save(self):
		db.session.add(self)
		db.session.commit()

	def delete(self):
		db.session.delete(self)
		db.session.commit()

	def set_permissions(self):
		p 						= Permissions.query.filter_by(email=self.email).one()
		self.is_admin 			= p.is_admin
		self.product_permission = p.product_permission
		self.about_permission 	= p.about_permission
		self.blog_permission 	= p.blog_permission
		self.gallery_permission = p.gallery_permission

	def name(self):
		return str(self.fname) + " " + str(self.lname)

	def password_validated(self, plaintext_password):
		return bcrypt.check_password_hash(self.password, plaintext_password)

	def set_password(self, plaintext_password):
		self.password = bcrypt.generate_password_hash(plaintext_password)
		self.save()

	def is_authenticated(self):
		return self.authenticated

	def is_active(self):
		return True;

	def is_anonymous(self):
		return False;

	def get_id(self):
		return str(self.id)

	def __repr__(self):
		return "<User: " + str(self.fname) + " " + str(self.lname) + ">"

class Authorization(db.Model):
	__tablename__	= "auths"
	id				= db.Column('id', db.Integer, primary_key=True, autoincrement=True)
	auth_name		= db.Column('name', db.String(120), nullable=False)
	auth_email		= db.Column('email', db.String(120), nullable=False, unique=True)
	auth_admin		= db.Column('admin_access', db.Boolean, default=False)
	auth_product 	= db.Column('product_access', db.Boolean, default=False)
	auth_about 		= db.Column('about_access', db.Boolean, default=False) 
	auth_blog		= db.Column('blog_access', db.Boolean, default=False)
	auth_gallery 	= db.Column('gallery_access', db.Boolean, default=False)
	auth_code		= db.Column('auth_code', db.String)

	def __init__(self, name, email, admin, blog, product, about, gallery):
		self.auth_name 		= name
		self.auth_email 	= email
		self.auth_admin 	= admin
		self.auth_blog 		= blog
		self.auth_product 	= product
		self.auth_about 	= about
		self.auth_gallery 	= gallery

	def setCode(self, plaintext_code):
		self.auth_code = bcrypt.generate_password_hash(plaintext_code)
		self.save()

	def codeValid(self, plaintext_code):
		return bcrypt.generate_password_hash(plaintext_code)

	def save(self):
		db.session.add(self)
		db.session.commit()

	def delete(self):
		db.session.delete(self)
		db.session.commit()

	def __repr__(self):
		return '<Authorization: %r>' % self.auth_email

class Payment(db.Model):
	__tablename__ 	= "payment"
	id 				= db.Column('id', db.Integer, primary_key=True, autoincrement=True)
	method 			= db.Column('method', db.String(120), nullable=False, unique=True)
	is_accepted 	= db.Column('is_accepted', db.Boolean, default=False, nullable=False)
	icon 			= db.Column('icon', db.String(120), default="Cash")

	def __init__(self, method):
		icon 				= "<i class='fas fa-money-bill-alt'></i>"
		self.method 		= method
		self.is_accepted 	= False
		method 				= method.lower()
		if method == "visa":
			icon = "<i class='fab fa-cc-visa'></i>"
		elif method == "mastercard":
			icon = "<i class='fab fa-cc-mastercard'></i>"
		elif method == "amex":
			icon = "<i class='fab fa-cc-amex'></i>"
		elif method == "check":
			icon = "<i class='fas fa-money-check'></i>"
		self.icon = icon

	def save(self):
		db.session.add(self)
		db.session.commit()

	def delete(self):
		db.session.delete(self)
		db.session.commit()

	def __repr__(self):
		return '<Payment Method: %r>' % self.method

class Product(db.Model):
	__tablename__ 	= "products"
	id 				= db.Column('id', db.Integer, primary_key=True, autoincrement=True)
	position 		= db.Column('position', db.Integer, nullable=False)
	name 			= db.Column('name', db.String, nullable=False)
	description 	= db.Column('description', db.String, nullable=False)
	price 			= db.Column('price', db.Integer, nullable=False)

	def __init__(self, name, description, price):
		self.name 			= name
		self.description 	= description
		self.price 			= price
		self.position 		= 0

	def save(self):
		db.session.add(self)
		db.session.commit()

	def delete(self):
		db.session.delete(self)
		db.session.commit()

	def __repr__(self):
		rep = str(self.service) + " $" + str(self.price)
		return '<Product: %s>' % rep

class About(db.Model):
	__tablename__ 	= "about"
	id 				= db.Column('id', db.Integer, primary_key=True, autoincrement=True)
	statement 		= db.Column('statement', db.String, nullable=False)
	is_active 		= db.Column('active', db.Boolean, default=True, nullable=False)

	def __init__(self, statement):
		self.statement = statement
		self.is_active = True

	def save(self):
		db.session.add(self)
		db.session.commit()

	def delete(self):
		db.session.delete(self)
		db.session.commit()

	def get_current_about():
		return About.query.filter_by(is_active=True).one()

	def active(self):
		current 			= get_current_about()
		current.is_active 	= False;
		self.is_active 		= True
		db.session.add(self)
		db.session.add(current)
		db.session.commit()

	def __repr__(self):
		return '<About Us: %r>' % self.statement

class Blog(db.Model):
	__tablename__ = "blogs"
	id 		= db.Column('id', db.Integer, primary_key=True, autoincrement=True)
	subject = db.Column('subject', db.String, nullable=False)
	content = db.Column('content', db.String, nullable=False)
	date 	= db.Column('date', db.TIMESTAMP)

	def __init__(self, subject, content):
		self.subject 	= subject
		self.content 	= content
		self.date 		= datetime.now()

	def save(self):
		db.session.add(self)
		db.session.commit()

	def delete(self):
		db.session.delete(self)
		db.session.commit()

	def getDate(self):
		date = {}
		date["date"] = self.date.strftime("%B %d, %Y")
		date["time"] = self.date.strftime("%I %m %p")
		return date

	def __repr__(self):
		rep = str(self.date) + " - " + str(self.subject)
		return '<Blog Post: %s>' % rep

class Company(db.Model):
	__tablename__ 	= "company"
	code 			= db.Column('id', db.String, default="nws", primary_key=True)
	address1 		= db.Column('address 1', db.String, nullable=False)
	address2 		= db.Column('address 2', db.String)
	address3 		= db.Column('address 3', db.String)
	city 			= db.Column('city', db.String, nullable=False)
	state 			= db.Column('state', db.String(2), nullable=False)
	zip_code 		= db.Column('zip_code', db.String(5), nullable=False)
	email 			= db.Column('email', db.String, default="info@naturalwomansalon.com", nullable=False)
	phone 			= db.Column('phone', db.String, nullable=False)
	monday 			= db.Column('monday', db.String)
	tuesday 		= db.Column('tuesday', db.String)
	wednesday 		= db.Column('wednesday', db.String)
	thursday 		= db.Column('thursday', db.String)
	friday 			= db.Column('friday', db.String)
	saturday 		= db.Column('saturday', db.String)
	sunday 			= db.Column('sunday', db.String)
	group_weekdays 	= db.Column('group_weekdays', db.Boolean, default=True, nullable=False)
	group_weekends 	= db.Column('group_weekends', db.Boolean, default=True, nullable=False)
	facebook_url 	= db.Column('facebook', db.String)
	twitter_url		= db.Column('twitter', db.String)
	instagram_url	= db.Column('instagram', db.String)
	show_facebook 	= db.Column('show_facebook', db.Boolean, default=True, nullable=False)
	show_twitter 	= db.Column('show_twitter', db.Boolean, default=True, nullable=False)
	show_instagram 	= db.Column('show_instagram', db.Boolean, default=True, nullable=False)
	special_hours 	= db.Column('special_hours', db.Boolean, default=False, nullable=False)
	hours_title 	= db.Column('hours_title', db.String(50), default="Hours of Operation")

	def __init__(self):
		self.address1 		= "8485 Old 13 Mile Road"
		self.city 			= "Warren"
		self.state 			= "MI"
		self.zip_code 		= "48093"
		self.phone 			= "(586) 315-8858"
		self.monday 		= "10am - 7pm"
		self.saturday 		= "10am - 7pm"
		self.sunday 		= "12pm - 5pm"
		self.facebook_url 	= "https://www.facebook.com/Natural-Woman-Salon-133665140595488/?ref=bookmarks"
		self.instagram_url 	= "https://www.instagram.com/naturalwomansalon/"
		self.twitter_url 	= "https://www.twitter.com"
		self.show_facebook 	= True
		self.show_instagram = True
		self.show_twitter 	= True
		self.group_weekdays = True
		self.group_weekends = False
		self.special_hours 	= False
		self.hours_title 	= "Hours of Operation"
		self.email 			= "info@naturalwomansalon.com"

	def setHoursTitle(self, title):
		is_special = self.special_hours
		if is_special == True:
			self.hours_title = title
		else:
			self.hours_title = "Hours of Operation"
		self.save()

	def save(self):
		saved = False
		q = Company.query.all()
		if len(q) < 2:
			db.session.add(self)
			db.session.commit()
			saved = True
		return saved

class Image(db.Model):
	__tablename__ = "images"
	id 		= db.Column('id', db.Integer, primary_key=True, autoincrement=True)
	url 	= db.Column('url', db.String, nullable=False)
	active 	= db.Column('active', db.Boolean, default=True, nullable=False)

	def __init__(self):
		self.url = url

	def save(self):
		db.session.add(self)
		db.session.commit()

	def delete(self):
		db.session.delete(self)
		db.session.commit()

	def show(self):
		self.active = True
		self.save()

	def hide(self):
		self.active = False
		self.save()

	def __repr__(self):
		return '<Image Post: %r>' % self.url
















