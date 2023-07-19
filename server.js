import jsonServer from 'json-server'
import jsonReset from 'json-server-reset'

const server = jsonServer.create()
const router = jsonServer.router('data.json')
const defaults = jsonServer.defaults({
  static: '.',
  bodyParser: true,
  readOnly: false
})

server.use(defaults)
server.use(jsonReset)
server.db = router.db
server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is available at http://localhost:3000')
})
