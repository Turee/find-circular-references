import { findCircularReferences } from '../src/find-circular-references'

describe('Find circular deps', () => {
  test('Simple case', () => {
    const a = {}
    const b = { k: 1 }
    const c = { q: 'asdf' }
    const d = {}
    a['b'] = b
    a['d1'] = d
    a['d2'] = d
    b['c'] = c
    c['a'] = a
    expect(findCircularReferences(a)).toEqual([{ object: a, paths: [[], ['b', 'c', 'a']] }])
  })

  test('Multiple paths', () => {
    const a = {}
    const b = { k: 1 }
    const ba = {}
    const c = { q: 'asdf' }
    a['b'] = b
    a['ba'] = b
    b['c'] = c
    c['a'] = a
    expect(findCircularReferences(a)).toEqual([
      { object: a, paths: [[], ['b', 'c', 'a'], ['ba', 'c', 'a']] }
    ])
  })

  test('Works with arrays', () => {
    const a: any[] = []
    const b = {}
    const c = {}
    a[0] = b
    b['c'] = c
    c['a'] = a
    expect(findCircularReferences(a)).toEqual([{ object: a, paths: [[], ['0', 'c', 'a']] }])
  })

  test('Does not fail on non object values', () => {
    expect(findCircularReferences(1)).toEqual([])
  })
})
