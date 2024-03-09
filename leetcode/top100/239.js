/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    let arr = []
    let res = []
    for (let i = 0; i < k; i++) {
        arr.push(nums[i])
    }
    for (let i = k - 1; i < nums.length; i++) {
        let max = arr[0]
        for (const v of arr) {
            max = Math.max(v, max)
        }
        res.push(max)

        arr.shift()
        arr.push(nums[i + 1])
    }
    console.log(res);
};

maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)