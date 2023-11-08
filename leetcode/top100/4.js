/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

//  283. 移动零
// 必须在不复制数组的情况下原地对数组进行操作。
// var moveZeroes = function (nums) {
//     for (let i = 0; i < nums.length; i++) {
//         if (nums[i] === 0) {
//             nums[i] = work(nums, i + 1)
//             if (nums[i] === 0) return nums
//         }
//     }
//     return nums
// };

// function work(nums, j) {
//     if (j === nums.length) return 0
//     if (nums[j] === 0) {
//         return work(nums, j + 1)
//     }

//     let temp = nums[j]
//     nums[j] = 0
//     return temp
// }

const moveZeroes = (nums) => {
    let j = 0;
    // 用j指向0 因为如果nums[i]等于0  那么没有操作，j就没动，指向0  直到swap，然后指向下一个可能为0的数
    for (let i = 0; i < nums.length; i++) {
        // if(nums[i]===0)
        if (nums[i] !== 0) {
            let temp = nums[i]
            nums[i] = nums[j]
            nums[j++] = temp
        }
    }
}

console.log(moveZeroes([0, 1, 0, 3, 12]))