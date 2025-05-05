% ----------------------------
% Table: users(id, username)
% ----------------------------
% Example: user(1, 'Alice').
:- dynamic user/2.

% ----------------------------
% Table: active_pets(id, user_id, pet_type, pet_username, hunger, health, happiness, age, status)
% ----------------------------
% Example: active_pet(1, 1, 'Fire', 'Flamy', 100, 100, 100, 0, alive).
:- dynamic active_pet/9.

% ----------------------------
% Table: pet_states(id, pet_id, action)
% ----------------------------
% Example: pet_state(1, 1, 'F'). % e.g., 'F' = fed
:- dynamic pet_state/3.

% ----------------------------
% Table: pet_types(id, pet_type)
% ----------------------------
% Example: pet_type(1, 'Fire').
:- dynamic pet_type/2.

% ----------------------------
% Table: pets(id, pet_type, pet_name)
% ----------------------------
% Example: pet(1, 'Water', 'AquaBoi').
:- dynamic pet/3.

% Check if a username already exists
username_exists(Username) :-
    user(_, Username).

% Get user by pet
user_of_pet(PetId, UserId) :-
    active_pet(PetId, UserId, _, _, _, _, _, _, _).

% Ensure pet_type exists
valid_pet_type(Type) :-
    pet_type(_, Type).

% Enforce "alive" or "dead" status
valid_status(alive).
valid_status(dead).

% -------------------------
% Users Table (id, username)
% -------------------------
user(1, 'ash').
user(2, 'misty').
user(3, 'brock').

% -------------------------
% Pet Types Table (id, pet_type)
% -------------------------
pet_type(1, 'Fire').
pet_type(2, 'Water').
pet_type(3, 'Air').
pet_type(4, 'Earth').

% -------------------------
% Pets Table (id, pet_type, pet_name)
% -------------------------
pet(1, 'Fire', 'Charmander').
pet(2, 'Water', 'Squirtle').
pet(3, 'Air', 'Pidgey').
pet(4, 'Earth', 'Sandshrew').

% -------------------------
% Active Pets Table (id, user_id, pet_type, pet_username, hunger, health, happiness, age, status)
% -------------------------
active_pet(1, 1, 'Fire', 'Charmy', 95, 100, 100, 1, alive).
active_pet(2, 1, 'Water', 'Bubbly', 90, 98, 97, 2, alive).
active_pet(3, 2, 'Air', 'Feathers', 88, 95, 96, 3, alive).
active_pet(4, 3, 'Earth', 'Dusty', 85, 92, 90, 4, alive).

% -------------------------
% Pet States Table (id, pet_id, action)
% Action can be: 'F' = feed, 'P' = play, 'H' = heal
% -------------------------
pet_state(1, 1, 'F').
pet_state(2, 1, 'P').
pet_state(3, 2, 'F').
pet_state(4, 3, 'H').
pet_state(5, 4, 'P').