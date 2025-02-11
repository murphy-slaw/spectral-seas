const I18N = Java.loadClass('net.minecraft.client.resources.language.I18n')
const regex = /diamond/i

ClientEvents.lang('en_us', event => {
  Utils.getRegistryIds('item').forEach(item => {
    if (item.path.match(regex)) {
      let key = 'item.' + item.toLanguageKey()
      let translated = I18N.get(key)
      if (!(translated === key)) {
        console.log(translated)
        let replaced = translated.replaceAll('Diamond', 'Aquamarine')
        console.log(replaced)
        event.renameItem(item, replaced)
      }
    }
  })

  Utils.getRegistryIds('block').forEach(block => {
    if (block.path.match(regex)) {
      let key = 'block.' + block.toLanguageKey()
      let translated = I18N.get(key)
      if (!(translated === key)) {
        console.log(translated)
        let replaced = translated.replaceAll('Diamond', 'Aquamarine')
        console.log(replaced)
        event.renameBlock(block, replaced)
      }
    }
  })
})
