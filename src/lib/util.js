/**
 * Read JSON file and return its content.
 * @param {*} event
 */
const readJsonFile = async (event, file) => {

  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = (event) => resolve(JSON.parse(event.target.result))
    fileReader.onerror = (error) => reject(error)
    fileReader.readAsText(file)
  })
}

const readMultipleJsonFiles = (event) => {
  const files = event.target.files
  const promises = []
  for (const element of files) {
    promises.push(readJsonFile(event, element))
  }
  return promises
}

export { readJsonFile, readMultipleJsonFiles }
