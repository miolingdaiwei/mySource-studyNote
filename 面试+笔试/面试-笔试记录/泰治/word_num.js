const work = (s) => {
    if (!s) {
        console.log(0);
        return
    }
    // 空字符串别忘记判断
    console.log(s.split(" ").length);
}

work("My")