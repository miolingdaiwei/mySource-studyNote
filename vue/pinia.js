const piniaSymbol = Symbol('pinia')
// symbol全局唯一key，避免重复
function createPinia() {
    // pinia  全局的pinia
    let pinia = {
        // app.use(pinia) 这个方法在执行之后会调用pinia的install方法完成安装 
        // 至于app参数就是将vue的createApp创建出来的实例的this
        install(app) {
            app.poride(piniaSymbol, pinia)
            state: ref({})
            // store内的state
            _s: new Map()
            // 存储每个store
        }
    }
    return pinia
}

// 定义store，组件中通过对象的点语法调用state/getter等
function defineStore(id, options) {

    function useStore() {
        // 高阶函数  函数执行完成后返回store实例
        let pinia = inject(piniaSymbol)
        // 提取pinia实例
        if (!pinia.get(id)) {
            // 是否存在重复id的store，重复则直接获取已有的store，否则创建store
            createOtionStore(id, options, pinia)
        }
        let store = pinia._s.get(id)
        return store
    }
    return useStore
}

function createOtionStore(id, options, pinia) {
    // const { state, ggetters, actions } = options
    let store = reactive({
        _p: pinia,
        id
    })
    Object.assign(store, setup())
    pinia._s.set(id, store)
    function setup() {
        const { state, getters, actions } = options
        // 判断 pinia.state.value 中是否有值，如果没值则将 state 的调用结果赋值进去
        !pinia.state.value[id] && (pinia.state.value[id] = state())
        // 此时通过 toRefs 将 pinia.state.value[id] 处理为响应式
        let localState = toRefs(pinia.state.value[id])
        // 处理getters 时先拿到内部所有的 key 组成的数组

        let localGetters = Object.keys(getters).reduce((item, name) => {
            // 通过computed，调用时，将this指向store即可完成读取state
            item[name] = computed(() => {
                const store = pinia._s.get(id)
                return getters[name].call(store, store)
            })
            return item
        }, {})

        // 此处将 处理后的 state/getters/actions 返回
        return Object.assign(localState, localGetters, actions)
    }


}

