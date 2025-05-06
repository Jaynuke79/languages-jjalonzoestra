# Lua Scripting In Factorio

### Lua is a lightweight, high-level, and embeddable scripting language designed to be integrated into other applications. 
It is particularly well-suited for extending and customizing existing software projects due to its small footprint, 
fast execution, and ease of embedding. Lua is often used as a scripting layer in games, web applications, and other 
software systems where flexibility and performance are critical. Its simplicity and portability make it an ideal 
choice for adding scripting capabilities to projects without significantly increasing their complexity or resource usage.

### Which is why my project is such an apt use case. 
Lua is ideal for embedding in applications like Factorio. Its simplicity and portability make it perfect for extending and customizing gameplay through mods, leveraging Factorio's robust Lua API for tasks like interacting with game surfaces, entities, and player actions.


## Example General Commands
| Code                                                                                           | Effect                                   | Explanation                                                                                     |
|------------------------------------------------------------------------------------------------|-----------------------------------------|-------------------------------------------------------------------------------------------------|
| `game.player.print`                                                                            | Prints a message to the player          | Used to send messages or debug information directly to the player's console.                   |
| `game.surfaces`                                                                                | Access game surfaces                    | Allows interaction with different surfaces (maps) in the game world.                           |
| `game.forces`                                                                                  | Access player forces (teams)            | Enables manipulation of teams, including research and relationships.                           |
| `game.create_entity`                                                                           | Spawns an entity in the game            | Used to programmatically create objects like items, enemies, or structures.                    |
| `game.tick`                                                                                    | Current game tick                       | Provides the current game time in ticks, useful for timing and scheduling.                     |
## Example Specific Commands Commands

| Code                                                                                           | Effect                                   | Explanation                                                                                     |
|------------------------------------------------------------------------------------------------|-----------------------------------------|-------------------------------------------------------------------------------------------------|
| `/c for _, e in pairs(game.player.surface.find_entities_filtered{position=game.player.position, radius=10}) do game.print(e.name) end` | Prints nearby entities' names           | Iterates through entities within a 10-tile radius of the player and prints their names.         |
| `/c local turret = game.surfaces[1].find_entities_filtered{name="gun-turret"}[1] if turret then game.player.teleport(turret.position) else game.print("No gun turret found.") end` | Teleports player to the nearest turret  | Finds the first gun turret on the first surface and teleports the player to its position, if it exists. |
| `/c game.player.color = {r = 0, g = 0, b = 1, a = 1}`                                          | Changes player color to blue            | Sets the player's color to blue using RGBA values.                                              |
| `/c game.player.color = {r = 1, g = 0, b = 0, a = 1}`                                          | Changes player color to red             | Sets the player's color to red using RGBA values.                                               |


## Categorizing Lua as a Programming Language

### Paradigm: Flexibility
Lua is a multi-paradigm programming language that supports procedural, object-oriented, functional, and data-driven programming styles. Its flexibility allows developers to choose the paradigm that best suits their needs.

### Typing Discipline: Highly Dynamic
Lua uses dynamic typing, meaning variables do not have fixed types and can hold values of any type. This makes it highly flexible but requires careful handling to avoid runtime errors.

### Execution Model: Lightweight, Interpreted
Lua is an interpreted language, typically executed via a lightweight virtual machine. This makes it portable and easy to embed in other applications.

### Use Cases
Lua is widely used in:
- Game development (e.g., Factorio, World of Warcraft mods)
- Embedded systems
- Scripting for applications
- Rapid prototyping

### Strengths
- Lightweight and fast
- Easy to embed
- Simple syntax
- Highly portable

### Weaknesses
- Limited standard library
- Not ideal for computationally intensive tasks
- Lack of built-in multithreading support
- Smaller community compared to some other languages

### History
Lua was created in 1993 by Roberto Ierusalimschy, Luiz Henrique de Figueiredo, and Waldemar Celes at the Pontifical Catholic University of Rio de Janeiro (PUC-Rio) in Brazil. It was initially developed to address the need for a flexible and lightweight scripting language for data description and configuration in software projects.

### Philosophy
Lua's design philosophy emphasizes simplicity, portability, and efficiency. It was built to be embedded in other applications, providing a powerful yet lightweight scripting layer. Lua's creators focused on keeping the language small and fast, avoiding unnecessary complexity while ensuring it could be easily integrated into diverse environments. This philosophy has made Lua a popular choice for applications requiring extensibility and customization.
