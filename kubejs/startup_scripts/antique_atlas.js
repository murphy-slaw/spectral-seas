//function addAntiqueAtlasMarker (level, texture, pos, color, name) {
function addAntiqueAtlasMarker (level, texture, pos, color, label) {
    let worldAtlasData = getAtlasData(level)
    // placeCustomMarker(World world, MarkerTexture selectedTexture, DyeColor color, MutableText label, BlockPos blockPos)
    worldAtlasData.placeCustomMarker(
        level,
        getAtlasTexture(texture),
        DyeColor.byName(color, DyeColor.WHITE),
        label,
        BlockPos(pos.x, pos.y, pos.z)
    )
}

function getAtlasData (level) {
    return WorldAtlasData.getOrCreate(
        Utils.server.getLevel(level.getDimension())
    )
}

function getAtlasTexture (texture) {
    return MarkerTextures.getInstance().get(ResourceLocation(texture))
}
