ServerEvents.recipes((event) => {
    event.smelting('2x bone_meal', '#spectral_seas:shells').xp(0.35)
    event.campfireCooking('2x bone_meal', '#spectral_seas:shells').xp(0.35)
})
