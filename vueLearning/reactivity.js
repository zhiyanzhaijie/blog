let data = {
  age: 18
}

let activeEffect // 储存最新副作用函数

const bucket = new WeekMap() // 储存全局被监视对象的对应键副作用函数

const track = (obj, key) => {
  // 当前无副作用函数
  if (!activeEffect) return
  // 某对象下带有响应属性的信息
  let deps = bucket.get(obj)
  if (!deps) {
    deps = new Map()
  }
  // 某对象下某键的副作用函数集合
  let _deps = deps.get(key)
  if (!_deps) {
    _deps = new Set()
  }
  _deps.add(activeEffect) // 将副作用函数加入集合
}

const trigger = (obj, key) => {
  let deps = bucket.get(obj)

  let _deps = bucket.get(key)

  _deps && _deps.forEach(fn => fn()) // 找到副作用集合并全响应
}

const obj = new Proxy(data, {
  get(key) {
    // 绑定副作用函数
    track(obj, key)
    return data[key]
  },
  set(key, val) {
    this.data[key] = val
    trigger(obj, key)
  }
})
