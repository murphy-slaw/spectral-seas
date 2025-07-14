// eslint-disable-next-line no-unused-vars
const RandomUtils = (function () {
    /**
     * @param {Map<string, number>} weightMap
     * @returns {string}
     */
    function weighted(weightMap) {
        const selections = Array.from(weightMap.keys())
        const weights = Array.from(weightMap.values())
        const total = weights.reduce((a, b) => a + b)
        const rand = Utils.random.nextInt(total)
        let cursor = 0
        for (let i = 0; i < weights.length; i++) {
            cursor += weights[i]
            if (cursor > rand) {
                return selections[i]
            }
        }
        throw new Error("weighted: this can't happen!")
    }

    return {
        weighted: weighted,
    }
})()
