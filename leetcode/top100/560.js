/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 和为k的子数组个数   子数组是连续

// 1. 简单遍历
// var subarraySum = function (nums, k) {
//     let count = 0;
//     for (let i = 0; i < nums.length; i++) {
//         let sum = 0;
//         // 为什么不需要三重循环，因为这里只考虑连续数组，那么j--可以保证每个连续数组都被判断过
//         for (let j = i; j >= 0; j--) {
//             sum += nums[j]
//             if (sum === k) {
//                 count++
//             }
//         }
//     }
//     return count
// };

// 2.dp
// dp 存储从j位置到i位置连续数组的sum
// var subarraySum = function (nums, k) {
//     let count = 0;
//     let dp = new Array(nums.length).fill(0)
//     for (let i = 0; i < nums.length; i++) {
//         for (let j = i; j >= 0; j--) {
//             dp[j] = dp[j] + nums[i]
//             if (dp[j] === k) {
//                 count++
//             }
//         }
//     }
//     return count
// };

// 前缀和与哈希
var subarraySum = function (nums, k) {
    const mp = new Map();
    mp.set(0, 1);
    let count = 0, pre = 0;
    for (const x of nums) {
        pre += x;
        if (mp.has(pre - k)) {
            // 判断有没有当前pre减去k后的前缀和数组
            count += mp.get(pre - k);
            // 有就将这个前缀和的数组数量拿出来
        }
        if (mp.has(pre)) {
            // 相同的前缀和需要给value+1
            mp.set(pre, mp.get(pre) + 1);
        } else {
            mp.set(pre, 1);
        }
    }
    return count;
};
let nums = [1, 1, 1]
k = 2
console.log(subarraySum(nums, k));