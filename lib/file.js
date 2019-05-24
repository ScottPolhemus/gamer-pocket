export const stringToArrayBuffer = (string) => {
  const buffer = new ArrayBuffer(string.length);
  const bufferView = new Uint8Array(buffer);

  for (let i = 0; i < string.length; i++) {
    bufferView[i] = string.charCodeAt(i);
  }

  return buffer;
}

export const fromTypedArray = (baseArray) => {
  try {
    if (!baseArray || !baseArray.length) {
      return [];
    }

    var arrayTemp = [];
    for (var index = 0; index < baseArray.length; ++index) {
      arrayTemp[index] = baseArray[index];
    }

    return arrayTemp;
  } catch (error) {
    cout("Conversion from a typed array failed: " + error.message, 1);

    return baseArray;
  }
}

export const createDataUrl = (fileContents) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    const blob = new Blob([new Uint8Array(fileContents)], { type: "application/octet-binary" })
    reader.onload = (e) => { resolve(e.target.result) }
    reader.readAsDataURL(blob)
  })
}

export const readFileInput = (input) => new Promise((resolve, reject) => {
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
