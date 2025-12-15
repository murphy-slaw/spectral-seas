const compoundTag = NBT.toTagCompound({})
const WrappedTag = (function () {
    /**
     * @param {string} key
     * @param {Internal.CompoundTag} nbt
     * @param {Function} getter
     * @param {Function} setter
     */
    return function (key, nbt, getter, setter) {
        return {
            get: () => getter.apply(nbt, [key]),
            set: (value) => setter.apply(nbt, [key, value]),
            clear: () => nbt.remove(key),
        }
    }
})()
const WrappedStringTag = (key, nbt) =>
    WrappedTag(key, nbt, compoundTag.getString, compoundTag.putString)
const WrappedCompoundTag = (key, nbt) =>
    WrappedTag(key, nbt, compoundTag.getCompound, compoundTag.put)
