// Priority: 0

ServerEvents.recipes(event => {
    SLAIN_ITEMS.forEach(item => {
        event.remove({ output: item })
        event.remove({ input: item })
    });
});
ServerEvents.tags('item', event => {
    event.removeAllTagsFrom(SLAIN_ITEMS); // Really important to untag stuff (ask me about it)
    event.add('spectral_seas:nukelist', SLAIN_ITEMS); // Add your own tag here for your modpack
    event.add('c:hidden_from_recipe_viewers', SLAIN_ITEMS); // Hides stuff from recipe viewers, even in 1.20.1 Forge
});