const $FluidTags = Java.loadClass('net.minecraft.tags.FluidTags');

PlayerEvents.tick(event => {
    let player = event.player;
    if (!(player.age % 20 === 0)) return;
    if (player.getHeadArmorItem().id === 'minecraft:turtle_helmet' && !player.isEyeInFluid($FluidTags.WATER)) {
        player.potionEffects.add("minecraft:water_breathing", 3600, 0, false, true);
        player.potionEffects.add("hybrid-aquatic:clarity", 3600, 0, false, true);
    }
});