 Copyright (c) 2023 ntrx. All rights reserved.

 -------------------------------------------------------

- Create hub & lordships

- Add effect coloring (bold + green) if it's overloaded -- ONGOING
- Add a notification system
- Implement item pricing
- Implement an arbitrary "Power" unit to weapons, armors, and trinkets

- Add item stats scaling (with souls)
DONE - Revamp the bonus/malus system : instead of directly altering stats, rather store these alterations into an array to better keep track of them.

- Reorganize gr_inventory.js structure (put some stuff into ev_inventory)
- Split the strider graphics into smaller functions for better refresh efficiency

DONE - Actually implement set bonuses

DONE - Make the interface more responsive

- Define a maximum strider level

ALCHEMY:
- Add possibility to craft multiple potions in one shot
ONGOING - Implement sound effects and animations
DONE - Prevent the use of the same ingredient multiple times
DONE - Add a notification system similar to Astral Forge's

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
DONE - Add blocking special effect & blocking action
DONE - Implement guarding mechanic
DONE - Implement shield in combats
- Freeze events on action (prevent action spamming)
- Implement consumables & using them in combat
- Thoroughly comment complex battle functions
ABANDONED? - Implement skill stackability
ONGOING - Change active effect display -> regroup everything to prevent clones, and only display the latest caster & skill
- Start implementing echoes

ASTRAL FORGE:
- Create GUI -- ONGOING
- Implement an item pricing change on alteration (increasing/decreasing stats brings the price up and down)
- Implement AstralForge guide (and general guide system)

DUNGEONS:
- Create floor transitions
- Connect dungeons to combats
ONGOING - Create dungeon hub and exploration start buttons
- Create "minigames"
- Wire the loot tables with the exploration hub so it updates the loot pool automatically without having to manually write it

CRAFTING:
- Start implementing

SOULWRITING:
DONE - Add soulmarks Price, Gold cost, Souls cost, Rarity
DONE - Change Sigil tooltip
DONE - Add Sigil soulmarks
DONE - Nerf all effects
- Actually display Soulwriting price
- Display price on Sigil tooltips
ONGOING - Implement Soulreading
- Implement Soulbending
- Add searchbar for soulmarks

SOULREADING:
DONE - Extract a soulmark multiple times to unlock its full potential
- Populate top part of the interface
- Tag player crafted Sigils so they can't be used for soulreading

SOULBINDING:
DONE - Prevent the addition of effects that do not already exist
DONE - Revamp the bonus system to make it a little more limited
DONE - Properly design an empty soulbinding screen
- Handle the Echo extraction/replacement (and a dedicated class for Seeds of Remembrance)

EONS:
DONE - Graphically redesign the whole thing. (using Crimson Pro + different background)

CARDS:
- Start implementing.

BLACK MARKET:
- Add a trade system
- Improve the logic to implement an amount of items the player might want to buy (for resources)

STRIDERS SCREEN:
- Implement formation interface
- Change the Striders screen (popup -> full section)
DONE - Add a "bonuses" tooltip to view all bonuses of a Strider
DONE - Improve the bonuses tooltip with more details (need to add origin of Echoes, and Combat Skills, and hiding these)
DONE - Prevent the display of null stats (armors with no Withering, mainly)
DONE - Display echoes' mechanics in the bonuses tooltip
DONE - Display the echo's origin object in the bonuses tooltip
- Add list of skills to the bottom of the screen

GAMEPLAY CHANGES:
DONE - By default, only allow echoes on Weapons, Shields and Armors. Only elder Helmets/Gauntlets/Boots/Trinkets can receive echoes.
- Prevent equipping the same echo twice (from two different items).

ECHOES: 
DONE - Add colors to effect names for a more comfortable read
- Update an echo's triggers owner variable on equipping/unequipping

TRIGGERS: 
DONE - Allow multiple trigger types per trigger

HOTFIXES: #Store your live fixes during dev sessions here and clear them once you're done
