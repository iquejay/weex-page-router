const node = require('@rollup/plugin-node-resolve').nodeResolve
const babel = require('@rollup/plugin-babel').babel
const flow = require('rollup-plugin-flow-no-whitespace')
const cjs = require('@rollup/plugin-commonjs')
const path = require('path')
const version = process.env.VERSION || require('./package.json').version

const resolve = _path => path.resolve(__dirname, './', _path)

const banner =
`/*!
  * weex-page-router v${version}
* (c) ${new Date().getFullYear()} Quejay
  * @license MIT
  */`

module.exports = [
  {
    file: resolve('dist/weex-page-router.min.js'),
    format: 'umd'
  },
  {
    file: resolve('dist/weex-page-router.esm.js'),
    format: 'es'
  }
].map(genConfig)

function genConfig (opts) {
  return {
    input: 'lib/index.js',
    output: {
      file: opts.file,
      format: opts.format,
      banner,
      name: 'WeexPageRouter'
    },
    plugins: [
      flow(),
      cjs(),
      node(),
      babel()
    ]
  }
}
