/**
 * The function `retryConnection` retries a callback function a specified number of times with a delay
 * of 5 seconds between retries.
 * @param callback - The `callback` parameter is a function that will be executed after a certain delay
 * when the `retryConnection` function is called.
 * @param retries - The `retries` parameter in the `retryConnection` function represents the number of
 * times the connection should be retried before showing an error message.

 */
export const retryConnection = (callback, retries, setLoading) => {
  const maxRetries = 5

  if (retries <= maxRetries) {
    setLoading(true)
    setTimeout(() => {
      callback()
    }, 5000)
  } else {
    setLoading(false)
  }
}
