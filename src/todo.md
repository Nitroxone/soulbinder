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
DONE - Split the strider graphics into smaller functions for better refresh efficiency

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
ONGOING - Implement consumables & using them in combat
- Thoroughly comment complex battle functions
ABANDONED? - Implement skill stackability
DONE - Change active effect display -> regroup everything to prevent clones, and only display the latest caster & skill
ONGOING - Start implementing echoes
DONE - Investigate and fix the shield issues
DONE - Improve the guarding ability (allow friendly skills on guarded allies)
DONE - Clear all Skill effects after a battle ends
- Prevent NPCs from being brought back to life by simple healing
DONE - Implement NPC critical effects
DONE - Allow delayed movement effects
ONGOING - Add more visual cues (critical hit, who is attacking...)
- Make it impossible to swap gear while in live combat
- Implement Striders stat restoration after combat (how much? all of it?)
- Implement Mobs carrying/using special items
DONE - Implement the Deathblows system
DONE - Remove Guard when a mob dies
- Add a function to manage stacks (for echoes, inner powers...)
DONE - Fix incorrect event target refresh when swapping weapons
DONE - Make Attack button select your first light weapon / your heavy weapon
- Implement different battle types (Wave, Special...)

ASTRAL FORGE:
- Create GUI -- ONGOING
- Implement an item pricing change on alteration (increasing/decreasing stats brings the price up and down)
- Implement AstralForge guide (and general guide system)
DONE - Prevent going further than allowed Max by reverting an alteration

DUNGEONS:
ONGOING - Create floor transitions
ONGOING - Connect dungeons to combats
ONGOING - Create dungeon hub and exploration start buttons
- Create "minigames"
- Wire the loot tables with the exploration hub so it updates the loot pool automatically without having to manually write it
DONE - Add icons to map room tiles. Unknown : Question mark. Visited: regular icon. Completed : checkmark, detail can be seen on hover (tooltip?)
DONE - Rewrite some parts of the dungeon refresh function so that it can be called without causing 'damage'.
DONE - Add items from loot to Knapsack
DONE - Block dungeon navigation while in combat
- Add possibility to leave room to come back later (regenerates a mob formation ; requires an item to prevent maluses?)
DONE - Disconnect Enter button from dungeon rooms to prevent spamming battles
ONGOING - Make it possible to swap gear within the Knapsack while exploring a dungeon

ONGOING - Implement the Dungeon inventory system
- Write a warning message if the player starts an exploration with an empty Knapsack
ON HOLD - Add a button to instantly empty the Knapsack
DONE - Correctly handle the Knapsack resources management
ABANDONED - Add the possibility to manually set a resource amount to add into the Knapsack
DONE - Add a MAJ+click and CTRL+click binds to remove 10/100 resources from the knapsack.
DONE - Prevent adding items to the knapsack from the inventory while in a dungeon
- Write a warning message in case the player tries to discard an item which rarity is better or equal to Grand
DONE - Fix a bug that prevents opening sets info from a Knapsack item
- Better handle the case where the user tries to add stuff to a full knapsack

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
DONE - Implement formation interface
- Change the Striders screen (popup -> full section)
DONE - Add a "bonuses" tooltip to view all bonuses of a Strider
DONE - Improve the bonuses tooltip with more details (need to add origin of Echoes, and Combat Skills, and hiding these)
DONE - Prevent the display of null stats (armors with no Withering, mainly)
DONE - Display echoes' mechanics in the bonuses tooltip
DONE - Display the echo's origin object in the bonuses tooltip
DONE - Add list of skills to the bottom of the screen

GAMEPLAY CHANGES:
DONE - By default, only allow echoes on Weapons, Shields and Armors. Only relic Helmets/Gauntlets/Boots/Trinkets can receive echoes.
- Prevent equipping the same echo twice (from two different items).

ECHOES: 
DONE - Add colors to effect names for a more comfortable read
DONE - Update an echo's triggers owner variable on equipping/unequipping

TRIGGERS: 
DONE - Allow multiple trigger types per trigger

LOOT:
DONE - Prevent infinite loops from trying to avoid duplicates with insufficient variety among the loot pool
DONE - Prevent skipping generation because of insufficient variety among the loot pool

DONE - Fix a bug with opening set info tooltips

DONE - Fix a bug that doesn't correctly assign mobs to a room
DONE - Fix ON_BATTLE_START triggers not being systematically fired

HOTFIXES: #Store your live fixes during dev sessions here and clear them once you're done