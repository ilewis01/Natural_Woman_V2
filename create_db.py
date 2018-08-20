
from natural_woman.models import *
from natural_woman.functions import generateRandomCode

db.drop_all()
db.create_all()

a1 = About("This is a very short about us statement")
a2 = About("This is another about us statement. It is semi-long just because I want to see how it will respond in the unordered list.")
a3 = About("This is the third about us statement. I am making this statement very long on purpose. This is more stuff that I am typing just to make sure that this is working properly when it is a long statement.")
p1 = Product("Wash & Go", "Get that dirty shit smelling good", 30, False)
p2 = Product("Perm", "Is yo shit nappy? Come get a damn perm bitch", 40, False)
p3 = Product("Beat Yo Shit", "Get yo shit tight for the club tonight so you can find yourself a man", 80, False)
p4 = Product("Super Slop", "Get that dirty shit smelling good", 30, False)
p5 = Product("Stripper Special", "Is yo shit nappy? Come get a damn perm bitch", 40, False)
p6 = Product("Lockup", "This is another description", 80, False)
p7 = Product("Club Night", "Rocking at the club", 30, False)
p8 = Product("Get A Man", "I know you lonely, get it right and get you some", 40, False)
p9 = Product("Rollers", "Look just like your grand mam", 80, True)
p10 = Product("Power Weave", "The faker and silkier, the better", 30, True)
p11 = Product("Super Naps", "All I can say is straightening iron", 40, True)
p12 = Product("Afro Sheen", "Afros are still in...", 80, False)


b1 = Blog("Blog entry 1", "This is just some dumb ass shit that I am typing to create this")
b2 = Blog("Put it up", "This is just another meaningless sentence")
c0 = Company()
m1 = Payment("Cash", "fake")
m2 = Payment("visa", "fake")
m3 = Payment("Mastercard", "fake")
m4 = Payment("AMEX", "fake")
m5 = Payment("check", "fake")
i1 = Image("/static/media/i4.jpg", "i4.jpg")
i2 = Image("/static/media/h2.jpg", "h2.jpg")
i3 = Image("/static/media/h3.jpg", "h3.jpg")
i4 = Image("/static/media/h4.jpg", "h4.jpg")
i5 = Image("/static/media/h7.jpg", "h7.jpg")
q1 = SecurityQuestion("This is question 1")
q2 = SecurityQuestion("This is question 2")
q3 = SecurityQuestion("This is question 3")
q4 = SecurityQuestion("This is question 4")

m1.is_accepted = True
m2.is_accepted = True
m3.is_accepted = True

a1.is_active = False
a2.is_active = False
a3.is_active = True

c0.show_twitter = False
c0.num_uploads = 5

code = generateRandomCode(8)
print(code)
auth = Authorization("johnny Walker", "johnny@drink.com", True, True, True, False, False)
auth.setCode(code)

u1 = User("Deez", "Nutz", "mynutz@gmail.com", "1234" )
u2 = User("Nasty", "Whore", "hotmess@gmail.com", "password")
u3 = User("Fake", "Bitch", "fake@fake.com", "work")
u4 = User("Admin", "User", "redd.app.dev@gmail.com", "1234")
u1.is_admin 			= True
u2.product_permission 	= True
u3.about_permission 	= True
u3.blog_permission 		= True
u3.gallery_permission 	= True
u4.is_admin 			= True
u4.product_permission 	= True
u4.about_permission 	= True
u4.blog_permission 		= True
u4.gallery_permission 	= True
u4.is_super 			= True
u4.is_locked 			= True

u1.save()
u2.save()
u3.save()
u4.save()
a1.save()
a2.save()
a3.save()
p1.save()
p2.save()
p3.save()
b1.save()
b2.save()
c0.save()
m1.save()
m2.save()
m3.save()
m4.save()
m5.save()
i1.save()
i2.save()
i3.save()
i4.save()
i5.save()
q1.save()
q2.save()
q3.save()
q4.save()

p4.save()
p5.save()
p6.save()
p7.save()
p8.save()
p9.save()
p10.save()
p11.save()
p12.save()







