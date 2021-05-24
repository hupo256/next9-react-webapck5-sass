const webpackConfig = {
  externals: ['next'],
  optimization: {
    emitOnErrors: false,
    checkWasmTypes: false,
    nodeEnv: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
      },
    },
    runtimeChunk: {
      name: 'webpack',
    },
    minimize: false,
    minimizer: [
      {
        options: {
          cacheDir: '/Users/mac/aven/front-marketing-website/.next/cache/next-minifier',
          parallel: 3,
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              safari10: true,
              comments: false,
              ascii_only: true,
            },
          },
        },
      },
      {
        __next_css_remove: true,
        options: {
          postcssOptions: {
            map: {
              inline: false,
              annotation: false,
            },
          },
        },
      },
    ],
    providedExports: false,
    usedExports: false,
    realContentHash: false,
  },
  context: '/Users/mac/aven/front-marketing-website',
  node: {},
  watchOptions: {
    aggregateTimeout: 5,
    ignored: ['**/.git/**', '**/node_modules/**', '**/.next/**', '**/.#*'],
  },
  output: {
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false,
    },
    path: '/Users/mac/aven/front-marketing-website/.next',
    filename: 'static/chunks/[name].js',
    library: '_N_E',
    libraryTarget: 'assign',
    hotUpdateChunkFilename: 'static/webpack/[id].[fullhash].hot-update.js',
    hotUpdateMainFilename: 'static/webpack/[fullhash].hot-update.json',
    chunkFilename: 'static/chunks/[name].js',
    strictModuleExceptionHandling: true,
    webassemblyModuleFilename: 'static/wasm/[modulehash].wasm',
  },
  performance: false,
  resolve: {
    extensions: ['.mjs', '.js', '.tsx', '.ts', '.jsx', '.json', '.wasm'],
    modules: ['node_modules', '/Users/mac/aven/front-marketing-website'],
    alias: {
      next: '/Users/mac/aven/front-marketing-website/node_modules/next',
      'private-next-pages': '/Users/mac/aven/front-marketing-website/pages',
      'private-dot-next': '/Users/mac/aven/front-marketing-website/.next',
      unfetch$: '/Users/mac/aven/front-marketing-website/node_modules/next/dist/build/polyfills/fetch/index.js',
      'isomorphic-unfetch$':
        '/Users/mac/aven/front-marketing-website/node_modules/next/dist/build/polyfills/fetch/index.js',
      'whatwg-fetch$':
        '/Users/mac/aven/front-marketing-website/node_modules/next/dist/build/polyfills/fetch/whatwg-fetch.js',
      'object-assign$':
        '/Users/mac/aven/front-marketing-website/node_modules/next/dist/build/polyfills/object-assign.js',
      'object.assign/auto':
        '/Users/mac/aven/front-marketing-website/node_modules/next/dist/build/polyfills/object.assign/auto.js',
      'object.assign/implementation':
        '/Users/mac/aven/front-marketing-website/node_modules/next/dist/build/polyfills/object.assign/implementation.js',
      'object.assign$':
        '/Users/mac/aven/front-marketing-website/node_modules/next/dist/build/polyfills/object.assign/index.js',
      'object.assign/polyfill':
        '/Users/mac/aven/front-marketing-website/node_modules/next/dist/build/polyfills/object.assign/polyfill.js',
      'object.assign/shim':
        '/Users/mac/aven/front-marketing-website/node_modules/next/dist/build/polyfills/object.assign/shim.js',
      url: '/Users/mac/aven/front-marketing-website/node_modules/native-url/dist/index.js',
      '/Users/mac/aven/front-marketing-website/node_modules/next/dist/next-server/lib/router/utils/resolve-rewrites.js': false,
    },
    fallback: {
      assert: '/Users/mac/aven/front-marketing-website/node_modules/assert/build/assert.js',
      buffer: '/Users/mac/aven/front-marketing-website/node_modules/buffer/index.js',
      constants: '/Users/mac/aven/front-marketing-website/node_modules/constants-browserify/constants.json',
      crypto: '/Users/mac/aven/front-marketing-website/node_modules/crypto-browserify/index.js',
      domain: '/Users/mac/aven/front-marketing-website/node_modules/domain-browser/source/index.js',
      http: '/Users/mac/aven/front-marketing-website/node_modules/stream-http/index.js',
      https: '/Users/mac/aven/front-marketing-website/node_modules/https-browserify/index.js',
      os: '/Users/mac/aven/front-marketing-website/node_modules/os-browserify/browser.js',
      path: '/Users/mac/aven/front-marketing-website/node_modules/path-browserify/index.js',
      punycode: 'punycode',
      process: '/Users/mac/aven/front-marketing-website/node_modules/process/browser.js',
      querystring: '/Users/mac/aven/front-marketing-website/node_modules/querystring-es3/index.js',
      stream: '/Users/mac/aven/front-marketing-website/node_modules/stream-browserify/index.js',
      string_decoder: 'string_decoder',
      sys: '/Users/mac/aven/front-marketing-website/node_modules/util/util.js',
      timers: '/Users/mac/aven/front-marketing-website/node_modules/timers-browserify/main.js',
      tty: '/Users/mac/aven/front-marketing-website/node_modules/tty-browserify/index.js',
      util: '/Users/mac/aven/front-marketing-website/node_modules/util/util.js',
      vm: '/Users/mac/aven/front-marketing-website/node_modules/vm-browserify/index.js',
      zlib: '/Users/mac/aven/front-marketing-website/node_modules/browserify-zlib/lib/index.js',
    },
    mainFields: ['browser', 'module', 'main'],
    plugins: [
      {
        paths: {
          '@service/*': ['service/*'],
          '@store/*': ['store/*'],
          '@components/*': ['components/*'],
          '@libs/*': ['libs/*'],
        },
        resolvedBaseUrl: '/Users/mac/aven/front-marketing-website',
      },
    ],
  },
  resolveLoader: {
    alias: {
      'emit-file-loader':
        '/Users/mac/aven/front-marketing-website/node_modules/next/dist/build/webpack/loaders/emit-file-loader',
      'error-loader':
        '/Users/mac/aven/front-marketing-website/node_modules/next/dist/build/webpack/loaders/error-loader',
      'next-babel-loader':
        '/Users/mac/aven/front-marketing-website/node_modules/next/dist/build/webpack/loaders/next-babel-loader',
      'next-client-pages-loader':
        '/Users/mac/aven/front-marketing-website/node_modules/next/dist/build/webpack/loaders/next-client-pages-loader',
      'next-serverless-loader':
        '/Users/mac/aven/front-marketing-website/node_modules/next/dist/build/webpack/loaders/next-serverless-loader',
      'noop-loader': '/Users/mac/aven/front-marketing-website/node_modules/next/dist/build/webpack/loaders/noop-loader',
      'next-plugin-loader':
        '/Users/mac/aven/front-marketing-website/node_modules/next/dist/build/webpack/loaders/next-plugin-loader',
      'next-style-loader':
        '/Users/mac/aven/front-marketing-website/node_modules/next/dist/build/webpack/loaders/next-style-loader',
    },
    modules: ['node_modules'],
    plugins: [],
  },
  module: {
    rules: [
      {
        test: {},
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: {},
        include: ['/Users/mac/aven/front-marketing-website', {}, {}, {}, {}],
        use: [
          '/Users/mac/aven/front-marketing-website/node_modules/@next/react-refresh-utils/loader.js',
          {
            loader: 'next-babel-loader',
            options: {
              isServer: false,
              distDir: '/Users/mac/aven/front-marketing-website/.next',
              pagesDir: '/Users/mac/aven/front-marketing-website/pages',
              cwd: '/Users/mac/aven/front-marketing-website',
              cache: false,
              babelPresetPlugins: [],
              development: true,
              hasReactRefresh: true,
              hasJsxRuntime: true,
            },
          },
        ],
      },
      {
        oneOf: [
          {
            test: {},
            loader: 'noop-loader',
            options: {
              __next_css_remove: true,
            },
          },
          {
            test: {},
            issuer: {},
            use: {
              loader: 'error-loader',
              options: {
                reason:
                  'CSS \u001b[1mcannot\u001b[22m be imported within \u001b[36mpages/_document.js\u001b[39m. Please move global styles to \u001b[36mpages/_app.js\u001b[39m.',
              },
            },
          },
          {
            sideEffects: false,
            test: {},
            issuer: {
              and: ['/Users/mac/aven/front-marketing-website'],
              not: [{}],
            },
            use: [
              {
                loader: 'next-style-loader',
                options: {},
              },
              {
                loader: '/Users/mac/aven/front-marketing-website/node_modules/next/dist/compiled/css-loader/cjs.js',
                options: {
                  importLoaders: 1,
                  sourceMap: true,
                  esModule: false,
                  modules: {
                    exportLocalsConvention: 'asIs',
                    exportOnlyLocals: false,
                    mode: 'pure',
                  },
                },
              },
              {
                loader: '/Users/mac/aven/front-marketing-website/node_modules/next/dist/compiled/postcss-loader/cjs.js',
                options: {
                  postcssOptions: {
                    plugins: [null, null],
                    config: false,
                  },
                  sourceMap: true,
                },
              },
            ],
          },
          {
            sideEffects: false,
            test: {},
            issuer: {
              and: ['/Users/mac/aven/front-marketing-website'],
              not: [{}],
            },
            use: [
              {
                loader: 'next-style-loader',
                options: {},
              },
              {
                loader: '/Users/mac/aven/front-marketing-website/node_modules/next/dist/compiled/css-loader/cjs.js',
                options: {
                  importLoaders: 3,
                  sourceMap: true,
                  esModule: false,
                  modules: {
                    exportLocalsConvention: 'asIs',
                    exportOnlyLocals: false,
                    mode: 'pure',
                  },
                },
              },
              {
                loader: '/Users/mac/aven/front-marketing-website/node_modules/next/dist/compiled/postcss-loader/cjs.js',
                options: {
                  postcssOptions: {
                    plugins: [null, null],
                    config: false,
                  },
                  sourceMap: true,
                },
              },
              {
                loader:
                  '/Users/mac/aven/front-marketing-website/node_modules/next/dist/compiled/resolve-url-loader/index.js',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: '/Users/mac/aven/front-marketing-website/node_modules/next/dist/compiled/sass-loader/cjs.js',
                options: {
                  sourceMap: true,
                  sassOptions: {
                    includePaths: ['/Users/mac/aven/front-marketing-website/styles'],
                  },
                },
              },
            ],
          },
          {
            test: [{}, {}],
            use: {
              loader: 'error-loader',
              options: {
                reason:
                  'CSS Modules \u001b[1mcannot\u001b[22m be imported from within \u001b[1mnode_modules\u001b[22m.\nRead more: https://nextjs.org/docs/messages/css-modules-npm',
              },
            },
          },
          {
            sideEffects: true,
            test: {},
            include: {
              and: [{}],
            },
            issuer: {
              and: ['/Users/mac/aven/front-marketing-website'],
              not: [{}],
            },
            use: [
              {
                loader: 'next-style-loader',
                options: {},
              },
              {
                loader: '/Users/mac/aven/front-marketing-website/node_modules/next/dist/compiled/css-loader/cjs.js',
                options: {
                  importLoaders: 1,
                  sourceMap: true,
                  modules: false,
                },
              },
              {
                loader: '/Users/mac/aven/front-marketing-website/node_modules/next/dist/compiled/postcss-loader/cjs.js',
                options: {
                  postcssOptions: {
                    plugins: [null, null],
                    config: false,
                  },
                  sourceMap: true,
                },
              },
            ],
          },
          {
            sideEffects: true,
            test: {},
            issuer: {
              and: ['/Users/mac/aven/front-marketing-website/pages/_app.js'],
            },
            use: [
              {
                loader: 'next-style-loader',
                options: {},
              },
              {
                loader: '/Users/mac/aven/front-marketing-website/node_modules/next/dist/compiled/css-loader/cjs.js',
                options: {
                  importLoaders: 1,
                  sourceMap: true,
                  modules: false,
                },
              },
              {
                loader: '/Users/mac/aven/front-marketing-website/node_modules/next/dist/compiled/postcss-loader/cjs.js',
                options: {
                  postcssOptions: {
                    plugins: [null, null],
                    config: false,
                  },
                  sourceMap: true,
                },
              },
            ],
          },
          {
            sideEffects: true,
            test: {},
            issuer: {
              and: ['/Users/mac/aven/front-marketing-website/pages/_app.js'],
            },
            use: [
              {
                loader: 'next-style-loader',
                options: {},
              },
              {
                loader: '/Users/mac/aven/front-marketing-website/node_modules/next/dist/compiled/css-loader/cjs.js',
                options: {
                  importLoaders: 3,
                  sourceMap: true,
                  modules: false,
                },
              },
              {
                loader: '/Users/mac/aven/front-marketing-website/node_modules/next/dist/compiled/postcss-loader/cjs.js',
                options: {
                  postcssOptions: {
                    plugins: [null, null],
                    config: false,
                  },
                  sourceMap: true,
                },
              },
              {
                loader:
                  '/Users/mac/aven/front-marketing-website/node_modules/next/dist/compiled/resolve-url-loader/index.js',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: '/Users/mac/aven/front-marketing-website/node_modules/next/dist/compiled/sass-loader/cjs.js',
                options: {
                  sourceMap: true,
                  sassOptions: {
                    includePaths: ['/Users/mac/aven/front-marketing-website/styles'],
                  },
                },
              },
            ],
          },
          {
            test: [{}, {}],
            issuer: {
              and: [{}],
            },
            use: {
              loader: 'error-loader',
              options: {
                reason:
                  'Global CSS \u001b[1mcannot\u001b[22m be imported from within \u001b[1mnode_modules\u001b[22m.\nRead more: https://nextjs.org/docs/messages/css-npm',
              },
            },
          },
          {
            test: [{}, {}],
            use: {
              loader: 'error-loader',
              options: {
                reason:
                  'Global CSS \u001b[1mcannot\u001b[22m be imported from files other than your \u001b[1mCustom <App>\u001b[22m. Please move all global CSS imports to \u001b[36mpages/_app.js\u001b[39m. Or convert the import to Component-Level CSS (CSS Modules).\nRead more: https://nextjs.org/docs/messages/css-global',
              },
            },
          },
          {
            issuer: {},
            exclude: [{}, {}, {}],
            use: {
              loader: '/Users/mac/aven/front-marketing-website/node_modules/next/dist/compiled/file-loader/cjs.js',
              options: {
                name: 'static/media/[name].[hash].[ext]',
              },
            },
          },
        ],
      },
    ],
    strictExportPresence: true,
  },
  plugins: [
    {
      webpackMajorVersion: 5,
      RuntimeGlobals: {
        require: '__webpack_require__',
        requireScope: '__webpack_require__.*',
        exports: '__webpack_exports__',
        thisAsExports: 'top-level-this-exports',
        returnExportsFromRuntime: 'return-exports-from-runtime',
        module: 'module',
        moduleId: 'module.id',
        moduleLoaded: 'module.loaded',
        publicPath: '__webpack_require__.p',
        entryModuleId: '__webpack_require__.s',
        moduleCache: '__webpack_require__.c',
        moduleFactories: '__webpack_require__.m',
        moduleFactoriesAddOnly: '__webpack_require__.m (add only)',
        ensureChunk: '__webpack_require__.e',
        ensureChunkHandlers: '__webpack_require__.f',
        ensureChunkIncludeEntries: '__webpack_require__.f (include entries)',
        prefetchChunk: '__webpack_require__.E',
        prefetchChunkHandlers: '__webpack_require__.F',
        preloadChunk: '__webpack_require__.G',
        preloadChunkHandlers: '__webpack_require__.H',
        definePropertyGetters: '__webpack_require__.d',
        makeNamespaceObject: '__webpack_require__.r',
        createFakeNamespaceObject: '__webpack_require__.t',
        compatGetDefaultExport: '__webpack_require__.n',
        harmonyModuleDecorator: '__webpack_require__.hmd',
        nodeModuleDecorator: '__webpack_require__.nmd',
        getFullHash: '__webpack_require__.h',
        wasmInstances: '__webpack_require__.w',
        instantiateWasm: '__webpack_require__.v',
        uncaughtErrorHandler: '__webpack_require__.oe',
        scriptNonce: '__webpack_require__.nc',
        loadScript: '__webpack_require__.l',
        chunkName: '__webpack_require__.cn',
        runtimeId: '__webpack_require__.j',
        getChunkScriptFilename: '__webpack_require__.u',
        getChunkUpdateScriptFilename: '__webpack_require__.hu',
        startup: '__webpack_require__.x',
        startupNoDefault: '__webpack_require__.x (no default handler)',
        startupOnlyAfter: '__webpack_require__.x (only after)',
        startupOnlyBefore: '__webpack_require__.x (only before)',
        chunkCallback: 'webpackChunk',
        startupEntrypoint: '__webpack_require__.X',
        onChunksLoaded: '__webpack_require__.O',
        externalInstallChunk: '__webpack_require__.C',
        interceptModuleExecution: '__webpack_require__.i',
        global: '__webpack_require__.g',
        shareScopeMap: '__webpack_require__.S',
        initializeSharing: '__webpack_require__.I',
        currentRemoteGetScope: '__webpack_require__.R',
        getUpdateManifestFilename: '__webpack_require__.hmrF',
        hmrDownloadManifest: '__webpack_require__.hmrM',
        hmrDownloadUpdateHandlers: '__webpack_require__.hmrC',
        hmrModuleData: '__webpack_require__.hmrD',
        hmrInvalidateModuleHandlers: '__webpack_require__.hmrI',
        amdDefine: '__webpack_require__.amdD',
        amdOptions: '__webpack_require__.amdO',
        system: '__webpack_require__.System',
        hasOwnProperty: '__webpack_require__.o',
        systemContext: '__webpack_require__.y',
        baseURI: '__webpack_require__.b',
        relativeUrl: '__webpack_require__.U',
        asyncModule: '__webpack_require__.a',
      },
    },
    {
      definitions: {
        Buffer: ['buffer', 'Buffer'],
        process: ['process'],
      },
    },
    {
      definitions: {
        'process.env.WEBPACK_ENV': '"\\"development\\""',
        'process.env.NODE_ENV': '"development"',
        'process.browser': 'true',
        'process.env.__NEXT_DIST_DIR': '"/Users/mac/aven/front-marketing-website/.next"',
        'process.env.__NEXT_TRAILING_SLASH': 'false',
        'process.env.__NEXT_BUILD_INDICATOR': 'true',
        'process.env.__NEXT_PLUGINS': 'false',
        'process.env.__NEXT_STRICT_MODE': 'false',
        'process.env.__NEXT_REACT_MODE': '"legacy"',
        'process.env.__NEXT_OPTIMIZE_FONTS': 'false',
        'process.env.__NEXT_OPTIMIZE_IMAGES': 'false',
        'process.env.__NEXT_OPTIMIZE_CSS': 'false',
        'process.env.__NEXT_SCRIPT_LOADER': 'false',
        'process.env.__NEXT_SCROLL_RESTORATION': 'false',
        'process.env.__NEXT_IMAGE_OPTS':
          '{"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","domains":[]}',
        'process.env.__NEXT_ROUTER_BASEPATH': '""',
        'process.env.__NEXT_HAS_REWRITES': 'false',
        'process.env.__NEXT_I18N_SUPPORT': 'false',
        'process.env.__NEXT_ANALYTICS_ID': '""',
      },
    },
    {
      filename: 'react-loadable-manifest.json',
    },
    {
      ampPages: {},
    },
    {
      prevAssets: null,
      previousOutputPathsWebpack5: {},
      currentOutputPathsWebpack5: {},
    },
    {
      options: {},
    },
    {
      buildId: 'development',
      rewrites: {
        beforeFiles: [],
        afterFiles: [],
        fallback: [],
      },
    },
    {},
    {},
  ],
  cache: {
    type: 'filesystem',
    version:
      '10.1.3|{"pageExtensions":["jsx","js"],"trailingSlash":false,"buildActivity":true,"plugins":false,"reactStrictMode":false,"reactMode":"legacy","optimizeFonts":false,"optimizeImages":false,"optimizeCss":false,"scrollRestoration":false,"basePath":"","pageEnv":false,"excludeDefaultMomentLocales":false,"assetPrefix":"","target":"server","reactProductionProfiling":false,"webpack":true}',
    cacheDirectory: '/Users/mac/aven/front-marketing-website/.next/cache/webpack',
    buildDependencies: {
      config: ['/Users/mac/aven/front-marketing-website/next.config.js'],
    },
  },
  mode: 'development',
  name: 'client',
  target: 'web',
  bail: false,
  devtool: 'eval-source-map',
}
