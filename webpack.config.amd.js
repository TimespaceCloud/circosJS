const path = require('path')

const filename = process.env.NODE_ENV === 'prod'
  ? 'circos-amd.min.js' : 'circos-amd.js'

module.exports = {
  entry: './src/circos.js',
  output: {
    path: __dirname + '/dist',
    filename: filename,
    //library: 'Circos',
    libraryTarget: 'amd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  node: {
    global: false,
    process: false,
    Buffer: false,
    setImmediate: false,
    __filename: false,
    __dirname: false
  }
}
