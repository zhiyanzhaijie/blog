let mData = {
  '张三': [1, 2, 3],
  '李四': [2, 2, 3],
  '王五': [3, 2, 3]
}

xAis = Object.keys(mData).sort((a, b) => mData[b][0] + mData[b][1] + mData[b][2] - (mData[a][0] + mData[a][1] + mData[a][2]))

console.log(xAis)
