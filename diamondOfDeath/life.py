class A:
    def __init__(self):
        print("A init")
        super().__init__()  # Allows proper MRO resolution

class B(A):
    def __init__(self):
        print("B init")
        super().__init__()

class C(A):
    def __init__(self):
        print("C init")
        super().__init__()

class D(B, C):  # Diamond: D -> B -> A, D -> C -> A
    def __init__(self):
        print("D init")
        super().__init__()

# Now let's instantiate D and see what happens
d = D()

# The output will be:
# D init
# B init
# C init
# A init

# Now there is only 1 A object in D, because of the use of super().