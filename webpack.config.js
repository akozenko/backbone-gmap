
module.exports = {
  entry: {
    app: [
      './js/main.js'
    ]
  },

  output: {
    path: __dirname + '/assets',

    filename: 'bundle.js',

    publicPath: '/assets/'
  },

  resolve: {
    root: __dirname,

    modulesDirectories: ['js', 'views', 'node_modules']

  },

  plugins: [
  ],

  module: {
    // preLoaders: [
    //   {test: /\.js$/, loader: 'eslint', exclude: /node_modules/},
    // ],
    loaders: [
      {test: /\.js$/, loaders: ['babel'], exclude: /node_modules/},
      {test: /\.json$/, loaders: ['json']},
      {test: /\.less$/, loaders: ['style', 'css', 'less', 'autoprefixer']},
      {test: /\.html$/, loaders: ['html']}
    ]
  },

  devtool: '#inline-source-map',

  eslint: {
    emitErrors: true,
    reporter: function(results) {
      return results.map(function(result) {
        return result.messages.map(function(msg) {
          return (
            ' ' + msg.message + '(' + msg.ruleId + ')' +
            ' @ line ' + msg.line + ' column ' + msg.column +
            ' - ' +
            (msg.fatal ? 'fatal, ' : '') +
            'severity: ' + msg.severity
          );
        }).join('\n');
      }).join('\n');
    }
  }
};
