import * as write from 'fs'

const resetDatabase = () => {
  const data = {
    todos: []
  }
  const str = JSON.stringify(data, null, 2) + '\n'
  write.writeFileSync('./data.json', str)
}

resetDatabase()
