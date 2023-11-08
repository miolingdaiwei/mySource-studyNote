/**
 * @param {string[]} strs
 * @return {string[][]}
 */
//  49.字母异位词分组

const groupAnagrams = (strs) => {
    let map = new Map()
    let set = new Set()
    for (const str of strs) {
        // 先sort  那么就可以直接比较是否相等  sort默认是字符串的比较
        let s2 = str.split("").sort().join("")
        // map存储字符相同的字符串数组
        map.has(s2) ? map.get(s2).push(str) : map.set(s2, [str])
    }
    // 通过使用array.from将map转为数组  因为map.value是Iterator对象
    return Array.from(map.values())
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));