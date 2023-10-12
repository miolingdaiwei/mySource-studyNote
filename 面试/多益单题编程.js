function getMax(s) {
    let map = new Map()
    for (const i of s) {
        if (!map.has(i)) {
            map.set(i, 1)
        } else {
            map.set(i, map.get(i) + 1)
        }
    }
    let max = 0;
    for (const i of map) {
        max = Math.max(max, i[1])
    }
    return max;
}

console.log(getMax("sdsddddavb"));