const WrappedEntry = Object.create(LootEntry.of('minecraft:air'))
WrappedEntry.test_abuse = thing => {
    console.log(thing)
}
WrappedEntry.test_abuse('moose time')
const evil = WrappedEntry.when(c => c.randomChance(0.5))
console.log(evil)
