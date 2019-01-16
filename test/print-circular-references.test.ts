import { printCircularReferences } from '../src/find-circular-references'
const consoleLog = global.console.log

beforeAll(() => {
  global.console.log = jest.fn()
})

afterAll(() => {
  global.console.log = consoleLog
})

describe('Find circular deps', () => {
  test('Prints circular dependencies', () => {
    const a = {}
    const b = { k: 1 }
    const c = { q: 'asdf' }
    a['b'] = b
    b['c'] = c
    c['a'] = a
    printCircularReferences(a)
    expect(global.console.log).toBeCalled()
  })
})
