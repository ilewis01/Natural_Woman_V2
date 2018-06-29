
from natural_woman.models import *

db.drop_all()
db.create_all()

a1 = About("This is a very short about ius statement")
a2 = About("This is another about us statement")
a3 = About("This is the third about us statement")
p1 = Product("Wash & Go", "Get that dirty shit smelling good", 30, 1)
p2 = Product("Perm", "Is yo shit nappy? Come get a damn perm bitch", 40, 2)
p3 = Product("Beat Yo Shit", "Get yo shit tight for the club tonight so you can find yourself a man", 80, 3)
b1 = Blog("Blog entry 1", "This is just some dumb ass shit that I am typing to create this")
b2 = Blog("Put it up", "This is just another meaningless sentence")
c0 = Company()

a2.active = False
a3.active = False

a1.save()
a2.save()
a3.save()
p1.save()
p2.save()
p3.save()
b1.save()
b2.save()
c0.save()

