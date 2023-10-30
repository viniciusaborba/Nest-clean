import { Either, left, right } from './either'

function doSomething(x: boolean): Either<string, number> {
  if (x) {
    return right(10)
  } else {
    return left('error')
  }
}

it('should be able to return a success result', () => {
  const result = doSomething(true)

  if (result.isRight()) {
    console.log(result.value)
  }

  expect(result.isRight()).toBe(true)
  expect(result.isLeft()).toBe(false)
})

it('should be able to return a error result', () => {
  const result = doSomething(false)

  expect(result.isLeft()).toBe(true)
  expect(result.isRight()).toBe(false)
})