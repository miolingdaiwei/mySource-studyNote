/**
 * @param {number[]} nums
 * @return {number}
 */

// 128. 最长连续序列
var longestConsecutive = function (nums) {
    if (!nums.length) return 0
    if (nums.length === 1) return 1
    let max = 0;
    nums.sort((a, b) => {
        return a - b
    })
    let dp = new Array(nums.length).fill(1)
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === (nums[i - 1] + 1)) dp[i] = dp[i - 1] + 1
        if (nums[i] === nums[i - 1]) dp[i] = dp[i - 1]
        max = Math.max(dp[i], max)
    }
    return max
};

console.log(longestConsecutive([1, 2, 0, 1]));