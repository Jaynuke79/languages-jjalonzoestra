# modules/tamagotchi.py
import time

class Tamagachi:
    def __init__(self, name):
        self.name = name
        self.hunger = 0       # Hunger increases over time
        self.health = 100     # Health decreases if hunger gets too high
        self.happiness = 100  # Happiness can be improved by playing
        self.age = 0          # Age increases with each tick
        self.alive = True

    def tick(self):
        """Simulate a game tick (e.g., every 2 seconds)."""
        if not self.alive:
            return
        self.hunger += 5
        self.age += 1

        # If hunger is above 50, health decreases
        if self.hunger > 50:
            self.health -= (self.hunger - 50) * 0.5

        # Check losing conditions
        if self.health <= 0 or self.hunger >= 100:
            self.alive = False

    def feed(self, amount=20):
        """Feed the Tamagotchi, reducing hunger."""
        if not self.alive:
            return "Game Over"
        self.hunger = max(self.hunger - amount, 0)
        return f"{self.name} was fed. Hunger is now {self.hunger}."

    def play(self):
        """Play with the Tamagotchi, boosting happiness but increasing hunger."""
        if not self.alive:
            return "Game Over"
        self.happiness = min(self.happiness + 10, 100)
        self.hunger += 5
        return f"{self.name} played! Happiness is now {self.happiness}."

    def give_medicine(self, amount=30):
        """Give medicine to improve health."""
        if not self.alive:
            return "Game Over"
        self.health = min(self.health + amount, 100)
        return f"{self.name} received medicine. Health is now {self.health}."

    def get_status(self):
        """Return the current status of the Tamagotchi."""
        return {
            "name": self.name,
            "hunger": self.hunger,
            "health": self.health,
            "happiness": self.happiness,
            "age": self.age,
            "alive": self.alive,
        }
