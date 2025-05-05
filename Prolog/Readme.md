# Prolog Pet Database

To Run: 
```bash
swipl -s db.pl
```

At the prompt, you can make queries or insert facts like:

```
% Add a new user
assert(user(1, 'ash')).

% Add a new pet for that user
assert(active_pet(1, 1, 'Fire', 'Charmy', 100, 100, 100, 0, alive)).

% Log a pet action (e.g., F = feed)
assert(pet_state(1, 1, 'F')).

% Check if a user exists
user(ID, 'ash').

% Find all pets owned by a user
active_pet(PetID, 1, PetType, PetUsername, _, _, _, _, Status).
```

Each time you hit ;, Prolog tries to unify the variables (ID, Name) with the next matching fact.

## In Summary
| Action         | Result                                       |
| -------------- | -------------------------------------------- |
| Type a query   | Prolog shows the first solution              |
| Press `;`      | Prolog shows the next match (backtracks)     |
| Press `.`      | Accept the current answer and stop searching |
| Press `Ctrl+D` | Exit the prompt                              |
