class Tamagotchi {
  constructor(name) {
    this.name = name;
    this.hunger = 0;
    this.health = 100;
    this.happiness = 100;
    this.age = 0;
    this.alive = true;
  }
  tick() {
    // Update the pet's state over time
    if (!this.alive) return;
    this.hunger += 5;
    this.age += 1;
    if (this.hunger > 50) {
      this.health -= (this.hunger - 50) * 0.5;
    }
    if (this.health <= 0 || this.hunger >= 100) {
      this.alive = false;
    }
  }
  feed(amount = 20) {
    if (!this.alive) return "Game Over";
    this.hunger = Math.max(this.hunger - amount, 0);
    return `${this.name} was fed. Hunger is now ${this.hunger}.`;
  }
  // ... add play(), giveMedicine(), etc.
  getStatus() {
    return {
      name: this.name,
      hunger: this.hunger,
      health: this.health,
      happiness: this.happiness,
      age: this.age,
      alive: this.alive,
    };
  }
}
export default Tamagotchi;
