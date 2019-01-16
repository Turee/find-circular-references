// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...

const recFindDeps = (
  objectGraph: any,
  seen: Map<any, string[][]>,
  currentPath: string[],
  parents: Set<any>
) => {
  if (objectGraph instanceof Object) {
    if (parents.has(objectGraph)) {
      // @ts-ignore
      seen.get(objectGraph).push(currentPath)
    } else {
      seen.set(objectGraph, [currentPath])
      Object.keys(objectGraph).forEach(k => {
        const val = objectGraph[k]
        recFindDeps(val, seen, [...currentPath, k], parents.add(objectGraph))
      })
    }
  }
  parents.delete(objectGraph)
  return seen
}

interface CircularReferenceResult {
  object: Object
  paths: string[][]
}

export const findCircularReferences = (objectGraph: any) => {
  const paths = recFindDeps(objectGraph, new Map(), [], new Set())
  const results: CircularReferenceResult[] = []
  paths.forEach((paths, object) => {
    if (paths.length > 1) {
      results.push({ paths, object })
    }
  })
  return results
}

const printPath = (path: string[]) => `.${path.join('.')}`

export const printCircularReferences = (objectGraph: any) => {
  const result = findCircularReferences(objectGraph)
  result.forEach(r => {
    console.log(`Circular references: \n${r.paths.map(printPath).join(' <--> ')}`)
  })
}
