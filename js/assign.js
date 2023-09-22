// Object.assign({})
// 这个时做了浅拷贝，更改原来的对象，如果同名简直，直接覆盖
function sum(x, y, z) {
    return x + y + z
}

sum([...1, 2, 3])
