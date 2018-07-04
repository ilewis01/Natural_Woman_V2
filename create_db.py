
from natural_woman.models import *

db.drop_all()
db.create_all()

a1 = About("This is a very short about us statement")
a2 = About("This is another about us statement. It is semi-long just because I want to see how it will respond in the unordered list.")
a3 = About("This is the third about us statement. I am making this statement very long on purpose. This is more stuff that I am typing just to make sure that this is working properly when it is a long statement.")
p1 = Product("Wash & Go", "Get that dirty shit smelling good", 30)
p2 = Product("Perm", "Is yo shit nappy? Come get a damn perm bitch", 40)
p3 = Product("Beat Yo Shit", "Get yo shit tight for the club tonight so you can find yourself a man", 80)
b1 = Blog("Blog entry 1", "This is just some dumb ass shit that I am typing to create this")
b2 = Blog("Put it up", "This is just another meaningless sentence")
c0 = Company()

a1.is_active = False
a2.is_active = False

u1 = User("Deez", "Nutz", "mynutz@gmail.com", "1234" )
u2 = User("Nasty", "Whore", "hotmess@gmail.com", "password")
u3 = User("Fake", "Bitch", "fake@fake.com", "work")
u1.is_admin = True
u2.product_permission = True
u3.about_permission = True
u3.blog_permission = True
u3.gallery_permission = True

u1.save()
u2.save()
u3.save()
a1.save()
a2.save()
a3.save()
p1.save()
p2.save()
p3.save()
b1.save()
b2.save()
c0.save()

