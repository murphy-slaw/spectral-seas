const WorldAtlasData = Java.loadClass('folk.sisby.antique_atlas.WorldAtlasData')
const SimplePointLandmark = Java.loadClass(
    'folk.sisby.surveyor.landmark.SimplePointLandmark'
)
const DyeColor = Java.loadClass('net.minecraft.world.item.DyeColor')

const MarkerTextures = Java.loadClass(
    'folk.sisby.antique_atlas.reloader.MarkerTextures'
)

//function addAntiqueAtlasMarker (level, texture, pos, color, name) {
function addAntiqueAtlasMarker (level, texture, pos, color, label) {
    let worldAtlasData = WorldAtlasData.getOrCreate(
        Utils.server.getLevel(level.getDimension())
    )
    let tex = MarkerTextures.getInstance().get(ResourceLocation(texture))
    console.log(tex)
    // placeCustomMarker(World world, MarkerTexture selectedTexture, DyeColor color, MutableText label, BlockPos blockPos)
    worldAtlasData.placeCustomMarker(
        level,
        tex,
        DyeColor.byName(color, DyeColor.WHITE),
        label,
        BlockPos(pos.x, pos.y, pos.z)
    )
}
