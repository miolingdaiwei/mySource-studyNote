
//   {0,3} 指的是长度0-3  {1,3 }效果一致1-3   \d 匹配整数  但字符串 0-3会为false


let reg = /^[1-9]\d{0,2}$/   // 1-999 这才是正确答案，第一个匹配正数开头，然后两位

let ss = 1

console.log(reg.test(ss));