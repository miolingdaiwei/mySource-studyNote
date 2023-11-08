// 438. 找到字符串中所有字母异位词

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
// var findAnagrams = function (s, p) {
//     let str = s;
//     let i = 0;
//     let j = p.length - 1;
//     let nums = [];
//     while (j < s.length) {
//         if (str.slice(i, j + 1).split("").sort().join("") === p) {
//             nums.push(i);
//         }
//         i++;
//         j++;
//     }
//     return nums
// }

var findAnagrams = function (s, p) {
    const sLen = s.length, pLen = p.length;

    // 明显长度不够直接return
    if (sLen < pLen) {
        return [];
    }

    const ans = [];
    const sCount = new Array(26).fill(0);
    const pCount = new Array(26).fill(0);
    // 26个字母 用空间存储每个字母的次数
    for (let i = 0; i < pLen; ++i) {
        // s[i].charCodeAt()-'a'.charCodeAt() 的下标出的数组项的值加一，当移动之后，判断两个窗口数组和比较的数组的每个项的值是否相等即可。
        ++sCount[s[i].charCodeAt() - 'a'.charCodeAt()];
        ++pCount[p[i].charCodeAt() - 'a'.charCodeAt()];
    }

    if (sCount.toString() === pCount.toString()) {
        ans.push(0);
    }

    for (let i = 0; i < sLen - pLen; ++i) {
        --sCount[s[i].charCodeAt() - 'a'.charCodeAt()];
        ++sCount[s[i + pLen].charCodeAt() - 'a'.charCodeAt()];

        if (sCount.toString() === pCount.toString()) {
            ans.push(i + 1);
        }
    }

    return ans;
};

console.log(findAnagrams(s, p));