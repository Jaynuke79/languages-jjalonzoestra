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

| Step                     | Description                                                                                     |
|--------------------------|-------------------------------------------------------------------------------------------------|
| **Source**               | Code is parsed into an abstract syntax tree (AST).                                             |
| **Bytecode**             | Code is compiled into Lua bytecode, where functions are treated as first-class compiled units. |
| **Virtual Machine (VM)** | Bytecode is executed by the Lua interpreter, a stackless, register-based VM (unlike the stack-based JVM or CPython VM). |

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

## What Lua doesn't have (by design):
- No native OOP system (you roll your own via tables/metatables)
- No built-in parallelism (only coroutines)
- No standard libraries for sockets, filesystems, or GUIs—expect the host to provide them

### History
Lua was created in 1993 by Roberto Ierusalimschy, Luiz Henrique de Figueiredo, and Waldemar Celes at the Pontifical Catholic University of Rio de Janeiro (PUC-Rio) in Brazil. It was initially developed to address the need for a flexible and lightweight scripting language for data description and configuration in software projects.

### Philosophy
Lua's design philosophy emphasizes simplicity, portability, and efficiency. It was built to be embedded in other applications, providing a powerful yet lightweight scripting layer. Lua's creators focused on keeping the language small and fast, avoiding unnecessary complexity while ensuring it could be easily integrated into diverse environments. This philosophy has made Lua a popular choice for applications requiring extensibility and customization.

## Technical Facts 

### Everything is a Table
Arrays, Dictionaries, Objects, Modules -- All Tables

Tables define an Array and Organizes Information Using Hashes

| Code                              | Explanation                                                                 |
|-----------------------------------|-----------------------------------------------------------------------------|
| `t = { [1] = "a", x = 42 }`       | Creates a table with an array element at index 1 and a hash element with key `"x"`. |
| `array[1] = "a"; hash["x"] = 42` | Describes how Lua internally represents the table with both array and hash parts. |

### Functions and Closures

#### Functions as First-Class Citizens
Functions are first-class citizens. This means they can:
- Be anonymous
- Be stored in variables
- Be passed as values to other functions

#### Lexical Scoping and Closures
Lua supports lexical scoping; Inner functions to capture and access variables from their enclosing scope. 

This enables the creation of closures, which are functions that maintain access to their defining environment even after that environment has exited.

#### Example: Creating a Counter Function
The following example demonstrates how to create a simple counter function in Lua using closures:

```lua
function make_counter()
  local count = 0
  return function()
    count = count + 1
    return count
  end
end

-- Usage
local counter = make_counter()
print(counter()) -- Output: 1
print(counter()) -- Output: 2
print(counter()) -- Output: 3
```

This function uses a local variable `count` to maintain state across multiple calls to the returned function. Each call increments the counter and returns the updated value.


### Metatables

Operator overloading with tables. Operations like indexing, arithmetic, or function calls through special keys called metamethods (e.g., `__index`, `__add`, `__call`).

#### Key Concepts:
- **Metatables**: Assigned to tables using `setmetatable`.
- **Metamethods**: Define custom behaviors for operations.

#### Common Metamethods:
- `__index`: Handles access to nonexistent keys.
- `__newindex`: Handles assignment to nonexistent keys.
- `__add`, `__sub`: Define custom arithmetic operations.
- `__call`: Makes a table callable like a function.

#### Example Use Case:
Metatables are often used to implement object-oriented programming, where tables act as objects and metatables define their behavior.

### Coroutines

#### What Are Coroutines?
Coroutines - Cooperative Multitasking. Unlike threads, coroutines are not preemptive; they yield control back to the caller explicitly, making them lightweight and efficient for managing tasks that can be paused and resumed.

#### Key Functions
- `coroutine.create`: Creates a new coroutine.
- `coroutine.resume`: Resumes a suspended coroutine.
- `coroutine.yield`: Suspends the execution of a coroutine.
- `coroutine.status`: Returns the status of a coroutine (`"running"`, `"suspended"`, `"dead"`).
- `coroutine.wrap`: Creates a coroutine and returns a function to resume it.

#### Example: Simple Coroutine
```lua
co = coroutine.create(function()
  for i = 1, 3 do
    print("Coroutine iteration:", i)
    coroutine.yield()
  end
end)

print(coroutine.status(co)) -- Output: suspended
coroutine.resume(co)        -- Output: Coroutine iteration: 1
coroutine.resume(co)        -- Output: Coroutine iteration: 2
coroutine.resume(co)        -- Output: Coroutine iteration: 3
print(coroutine.status(co)) -- Output: dead
```

#### Use Cases
- **Asynchronous Programming**: Manage tasks like I/O operations without blocking the main program.
- **Generators**: Produce a sequence of values on demand.
- **State Machines**: Implement systems that transition between states in a controlled manner.
