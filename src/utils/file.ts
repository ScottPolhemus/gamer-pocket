export const stringToArrayBuffer = (string: string) => {
  const buffer = new ArrayBuffer(string.length)
  const bufferView = new Uint8Array(buffer)

  for (let i = 0; i < string.length; i++) {
    bufferView[i] = string.charCodeAt(i)
  }

  return buffer
}

export const fromTypedArray = (baseArray: Uint8Array) => {
  try {
    if (!baseArray || !baseArray.length) {
      return []
    }

    var arrayTemp = []
    for (var index = 0; index < baseArray.length; ++index) {
      arrayTemp[index] = baseArray[index]
    }

    return arrayTemp
  } catch (error) {
    console.log('Conversion from a typed array failed: ' + error.message)

    return baseArray
  }
}

export const createDataUrl = (
  fileContents: ArrayBufferLike
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    const blob = new Blob([new Uint8Array(fileContents)], {
      type: 'application/octet-binary',
    })
    reader.onload = (e) => {
      if (e.target) {
        resolve(e.target.result as string)
      } else {
        reject()
      }
    }
    reader.readAsDataURL(blob)
  })
}

export const readFileInput = (input: HTMLInputElement): Promise<string> =>
  new Promise((resolve, reject) => {
    try {
      if (input.files && input.files.length > 0) {
        const reader = new FileReader()

        reader.addEventListener('load', () => {
          if (reader.readyState === 2) {
            resolve(reader.result as string)
          }
        })

        reader.readAsBinaryString(input.files[0])
      } else {
        reject()
      }
    } catch (e) {
      reject(e)
    }
  })
