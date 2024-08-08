import { encriptar, desencriptar } from '../utils/encryptStrings' // Replace './encryption' with your actual file path

test('Encriptar and Desencriptar: "Hello World"', () => {
  const texto = 'Hello World'
  const textoEncriptado = encriptar(texto)
  const textoDesencriptado = desencriptar(textoEncriptado)
  expect(textoDesencriptado).toBe(texto)
})

test('Encriptar and Desencriptar: "12345"', () => {
  const texto = '12345'
  const textoEncriptado = encriptar(texto)
  const textoDesencriptado = desencriptar(textoEncriptado)
  expect(textoDesencriptado).toBe(texto)
})

test('Encriptar and Desencriptar: "Special Characters !@#$%^&*()"', () => {
  const texto = 'Special Characters !@#$%^&*()'
  const textoEncriptado = encriptar(texto)
  const textoDesencriptado = desencriptar(textoEncriptado)
  expect(textoDesencriptado).toBe(texto)
})

test('Encriptar and Desencriptar: "Empty String"', () => {
  const texto = ''
  const textoEncriptado = encriptar(texto)
  const textoDesencriptado = desencriptar(textoEncriptado)
  expect(textoDesencriptado).toBe(texto)
})

test('Encriptar and Desencriptar: "Long Text"', () => {
  const texto =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  const textoEncriptado = encriptar(texto)
  const textoDesencriptado = desencriptar(textoEncriptado)
  expect(textoDesencriptado).toBe(texto)
})
