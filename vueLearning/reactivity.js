let data = {
  age: 18
}

let activeEffect // 储存最新副作用函数

function effect(fn) {
  // 这里不太理解, 目前代码还会处于死循环中
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    fn()
  }
  effectFn.deps = []
  effectFn()

  function cleanup(effectFn) {
    for (let i = 0; i < effectFn.length; i++) {
      const deps = effectFn.deps[i]
      deps.delete(effectFn)
    }
    effectFn.deps.length = 0
  }
}

effect(() => {
  document.body.innerText = obj.age
})

const bucket = new WeakMap() // 储存全局被监视对象的对应键副作用函数

const track = (obj, key) => {
  // 当前无副作用函数
  if (!activeEffect) return
  // 某对象下带有响应属性的信息
  let deps = bucket.get(obj)
  if (!deps) {
    bucket.set(obj, (deps = new Map()))
  }
  // 某对象下某键的副作用函数集合
  let _deps = deps.get(key)
  if (!_deps) {
    deps.set(key, (_deps = new Set()))
  }
  _deps.add(activeEffect) // 将副作用函数加入集合
  activeEffect.deps.push(_deps) // 将集合与当前激活副作用建立依赖关系
}

const trigger = (obj, key) => {
  let deps = bucket.get(obj)
  if (!deps) return
  let _deps = deps.get(key)
  const effectFns = new Set(_deps) // 拷贝一份当前集合，避免死循环
  effectFns.forEach(effectFn => effectFn()) // 找到副作用集合并全响应, 每个effectFn执行时会触发cleanup
}

const obj = new Proxy(data, {
  get(target, key) {
    // 绑定副作用函数
    track(target, key)
    return target[key]
  },
  set(target, key, val) {
    target[key] = val
    trigger(target, key)
  }
})
