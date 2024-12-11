const $FluidTags = Java.loadClass('net.minecraft.tags.FluidTags');
PlayerEvents.tick(event => {
    let player = event.entity;
    if (!(player.age % 20 === 0)) return;
    let helmet = player.getHeadArmorItem();
    if (helmet.id === 'minecraft:turtle_helmet' && player.isEyeInFluid($FluidTags.WATER)) {
        player.potionEffects.add("minecraft:water_breathing", 40, 0, false, true);
        player.potionEffects.add("hybrid-aquatic:clarity", 40, 0, false, true);
        helmet.hurtAndBreak(1, player, entity => { return true; });
    }
});
