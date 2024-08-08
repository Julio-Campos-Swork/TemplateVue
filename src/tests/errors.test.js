import { ServerError } from '../utils/errors' // Replace with your actual file path

describe('ServerError', () => {
  test('can be instantiated with empty message', () => {
    const error = new ServerError('')
    expect(error).toBeInstanceOf(ServerError)
    expect(error.name).toBe('ServerError')
    expect(error.message).toBe('')
    expect(error.error).toBeUndefined()
  })

  test('can be instantiated with a non-empty message', () => {
    const errorMessage = 'Something went wrong on the server'
    const error = new ServerError(errorMessage)
    expect(error).toBeInstanceOf(ServerError)
    expect(error.name).toBe('ServerError')
    expect(error.message).toBe(errorMessage)
    expect(error.error).toBeUndefined()
  })

  test('can be instantiated with an error object', () => {
    const errorMessage = 'Something went wrong on the server'
    const errorObj = new Error('Inner error')
    const error = new ServerError(errorMessage, errorObj)
    expect(error).toBeInstanceOf(ServerError)
    expect(error.name).toBe('ServerError')
    expect(error.message).toBe(errorMessage)
    expect(error.error).toBe(errorObj)
  })

  test('inherits from the Error class', () => {
    const error = new ServerError('')
    expect(error).toBeInstanceOf(Error)
  })

  //   test('throws an error when message is not a string', () => {
  //     expect(() => {
  //       new ServerError(123)
  //     }).toThrow('Message must be a string')
  //   })
})
