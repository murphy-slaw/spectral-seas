# Changelog for [Spectral Seas](https://github.com/murphy-slaw/spectral-seas)

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0]

The Endless Update!

Dimensions come, dimensions go. Some quality of life changes. Some unpleasant surprises. A sanctum sanctorum.

### Fixed

-   Pirate ships no longer drop their hold loot when despawning due to distance
-   Improved automatic third-person transitions when swimming or entering a boat
-   Disabled the shield decoration recipe since adding banners doesn't work with round shields
-   Tropical stew is no longer edible when full
-   Fixed coal not appearing in shipwreck supply chests
-   Added missing translations for caving advancements
-   Added missing Antique Atlas tile configuration for custom biomes
-   Removed Enchanter recipes for removed vanilla enchantments

### Changed

-   Removed the End dimension
    -   Removed strongholds and all End Portal related content
    -   Eyes of ender lead to a different structure
    -   Required End content has been moved to a new secret cave biome, the Ender Caves
    -   Renamed Dragon's Breath to Dragonfly Breath. Can be obtained in small amounts by feeding dragonflies unusual snacks
-   Increased minimum distance between shipwrecks
-   Cleaned up the EMI index a bit and grouped more items
-   Tweaked Ecologics walnut trees to fit in better with Geophilic oak trees
-   Reduced spawn counts for Corsairs on beaches
-   Made Gliders recipes cheaper
-   The slingshot can now fire splash potions, fire charges, bombs, snowballs, and ender pearls
-   Disabled biome temperature speed modifiers for Small Ships
-   Made sus sand patches for beachcombing slightly larger
-   Unified Bleeding effects from Hybrid Aquatic and Tridents n' Stuff
-   Removed a few enchantments
    -   Dullness: too dull
    -   Phase Strafe: too hard to use, not different enough from Phase Leap
    -   Hover: too similar to Air Hop and Cotton Cloud boots
-   Increased variation in ration sack contents
-   Removed the Spectrum multitool (sorry)
-   Suppressed a bunch of useless log messages
-   Switched item removals to use Reliable Remover instead of custom KubeJS scripts
-   Restored Inventory Profiles Next and replaced MacOS Input Fixes with NoEmu to work around item scrolling bug

### Added

-   Added the Port-Folio, a little piece of luggage that allows the player to access a personal pocket dimension
    -   Crafted with a tier 2 pedestal
    -   To use, place on the ground, bind with a Paintbrush, and click to open
    -   When open and crouched upon, transports the player to their personal Workspace
-   Added Potion Workshop recipes for most non-vanilla potions
-   Added Enchanter recipes and upgrade recipes for most non-vanilla enchantments
-   Added EMIDiscovery to prevent the EMI index from revealing too many secrets
    -   The index only displays items which the player has held, and items that can be crafted from known items
    -   The set of known items is pre-populated with most vanilla items
    -   Usage lookup is disabled for craftable but unknown items
-   Added some fun surprises to towers
-   Seagulls now drop feathers
-   Tall dunegrass can be woven into string
-   Sacks and bundles are now dyeable
-   The Crystal Apothecary can now collect Galosphere crystal shards
-   Added Stucturify mod to prevent structure overlap and limit structure generation near spawn
-   Added FastNoise mod to help with worldgen speed
-   Added pack version number to home screen and logs

## [1.0.3] 2026-02-08

More ship variants, a few bugfixes, some QOL changes, and ziplines. For no reason except ZIPLINES!

### Fixed

-   Fixed anchor point for about menu. Should fix about menu weirdness on high resolution screens
-   Reduced number of mods shipped as overrides on both Modrinth and CurseForge

### Changed

-   Replaced Inventory Profiles Next with Mouse Tweaks to fix inventory scroling

### Added

-   Added crafting recipe for saddles
-   Added Easy Shulker Boxes. Replaces Bundle Backport-ish and allows loading and accessing sack contents in the inventory
-   Small Ships can now be crafted from Ecologics wood types: walnut, azalea, flowering azalea, and coconut
-   Added Ziplines:Rezipped. Connect fences with ropes or chains and zip along them by holding RMB and jumping while aiming at a line holding a pickaxe.

## [1.0.2] 2026-02-05

### Added

-   Force a small island to exist at world spawn if there is no dry land there
-   Added seashells to Stony Shores

### Changed

-   Make towers slightly more common
-   Pirate Ship updates

    -   reduced pirate ship spawn rates
    -   lowered base speed, increased starting speed, reduced slowdown in turns
    -   increased crew size by 1
    -   added loot to ship holds

-   Disabled forced fullscreen on launch
-   Move third person maps below the compass ribbon
-   Disable HUD hiding by default

### Fixed

-   Fixed some dependencies for the server pack
-   Cleaned up some log spam

## [1.0.1] 2026-01-26

What would a new release be without a few hotfixes?

### Changed

-   Removed Spawn Balance Utility until I can figure out why it was blocking all Hybrid Aquatic mobs. This made it unreasonably difficult to progress!
-   Disable auto-third-person when riding animals
-   Auto-load the About screen on first load.

### Fixed

-   Fixed some broken messages in bottles.
-   Fixed some elements being misplaced on the About screen when resizing windows.
-   Fixed the Brigg recipe having the wrong item IDs for a couple of ingredients.

## [1.0.0] 2026-01-26

Initial public release.
