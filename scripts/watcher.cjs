const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')

const componentsFolder = path.resolve(__dirname, '../src/lib/components')
const indexFile = path.join(componentsFolder, 'index.ts')
const removeExt = (path) => path.split('.').shift()

const watcher = chokidar.watch(componentsFolder, {
   ignored: /index\.ts/,
   persistent: true,
})

function update() {
   const files = fs.readdirSync(componentsFolder)
   const lines = ['export default {}']

   for (const file of files) {
      if (file.endsWith('.svelte')) {
         const name = removeExt(file)
         lines.push(`export { default as ${name} } from './${file}'`)
      }
   }

   fs.writeFileSync(indexFile, lines.join('\n'))
}

watcher.on('add', update)
watcher.on('unlink', update)