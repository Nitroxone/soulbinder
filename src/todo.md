- Add consumables (potions)
- Add books

- Create hub & lordships

- Add effect coloring (bold + green) if it's overloaded -- ONGOING
- Add a notification system
- Implement item pricing

- Actually implement set bonuses

- Rename: Rune -> Sigil

BATTLES:
DONE - Implement and improve skill launch conditions
DONE - Implement stamina/mana checks
DONE - Implement error messages
DONE - Implement a battle order indicator
DONE - Implement Move resistance, Stun resistance
DONE - Implement Stun mechanic
DONE - Implement Bleeding & Poisoning
DONE - Add Stun chance & Movement chance modifiers
DONE - Implement execution of battle popups in the beginning of the round
DONE - Implement launch pos checks
DONE - Implement skill cooldown
DONE - Implement remaining GUI (Round, Location...)
DONE - Implement all modifiers (Stun modif, Poison modif, Bleed modif...)
- Implement consumables & using them in combat
- Add blocking special effect & blocking action
- Implement guarding mechanic
- Implement skill stackability
- Thoroughly comment complex battle functions

BATTLE AI:
- Start implementing

ASTRAL FORGE:
- Create GUI -- ONGOING
- Implement an item pricing change on alteration (increasing/decreasing stats brings the price up and down)
- Implement AstralForge guide (and general guide system)

DUNGEONS:
- define precisely the difference between "room" and "bridge" events
- write the action() method that will allow the player to choose his path in the dungeon (go to a room or go to a bridge) the choices of the player must influence the dungeon
- define precisely the number of levels in a dungeon, and the number of rooms that each level can cover
- define the closing of a dungeon (last event before the exit): what type of encounter? when does it occur?
- create encounters according to their type (allied, mob waves or bosses... etc)
- create loot tables