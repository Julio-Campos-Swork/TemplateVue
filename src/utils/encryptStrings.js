export function encriptar(texto) {
  let encriptado = ''
  for (let i = 0; i < texto.length; i++) {
    let charCode = texto.charCodeAt(i)
    encriptado += String.fromCharCode(charCode + 5)
  }
  return encriptado
}

export function desencriptar(textoEncriptado) {
  let desencriptado = ''
  for (let i = 0; i < textoEncriptado.length; i++) {
    let charCode = textoEncriptado.charCodeAt(i)
    desencriptado += String.fromCharCode(charCode - 5)
  }
  return desencriptado
}
