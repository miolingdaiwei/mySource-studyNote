//   交通灯 轮询的模拟

const traffic = document.getElementById('traffic');

function wait(time) {
    // 
    new Promise()
    return new Promise((resolve => setTimeout(resolve, time)))
}

function setState(state) {
    traffic.className = state;
}

async function start() {
    while (1) {
        setState("wait");
        await wait(1000);
        setState("stop");
        await wait(1000);
        setState("pass");
        await wait(1000);
    }
}