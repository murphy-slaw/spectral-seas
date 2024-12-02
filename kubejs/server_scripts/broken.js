EntityEvents.hurt(event => {
    if (event.source.getType() == 'player') {
        let item = event.source.getImmediate().getMainHandItem();
        if (item.isDamageableItem() && item.damageValue >= item.maxDamage) {
            event.cancel();
        }
    }
});