const write = require('fs').writeFileSync

const resetDatabase = () => {
  const data = {
    todos: []
  }
  const str = JSON.stringify(data, null, 2) + '\n'
  write('./data.json', str)
}

resetDatabase()
