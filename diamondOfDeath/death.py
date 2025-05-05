class A:
    def __init__(self):
        print("A init")

class B(A):
    def __init__(self):
        print("B init")
        A.__init__(self)

class C(A):
    def __init__(self):
        print("C init")
        A.__init__(self)

class D(B, C):
    def __init__(self):
        print("D init")
        B.__init__(self)
        C.__init__(self)

d = D()

# The output will be:
# D init
# B init
# A init
# C init
# A init

# Multiple A objects are created in one instance of D, which may lead to issues when you try to edit an A instance in D.
# There are 2 A objects in D, one from B and one from C.