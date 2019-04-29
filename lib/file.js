export const readFileFromInput = (input) => {
  return new Promise((resolve, reject) => {
    try {
      if (input.files.length > 0) {
        const reader = new FileReader()

        reader.addEventListener('load', () => {
          if (reader.readyState === 2) {
            resolve(reader.result)
          }
        })

        reader.readAsBinaryString(input.files[0])
      } else {
        reject()
      }
    } catch(e) {
      reject(e)
    }
  })
}

export const stringToArrayBuffer = (string) => {
  const buffer = new ArrayBuffer(string.length * 4);
  const bufferView = new Uint8Array(buffer);
  
  for (let i = 0; i < string.length; i++) {
    bufferView[i] = string.charCodeAt(i);
  }
  
  return buffer;
}

export const arrayBufferToString = (buffer) => {
  return String.fromCharCode.apply(null, new Uint16Array(buffer));
}

export const createDataUrl = (fileContents) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    const blob = new Blob([new Uint8Array(fileContents)], { type: "application/octet-binary" })
    reader.onload = (e) => { resolve(e.target.result) }
    reader.readAsDataURL(blob)
  })
}