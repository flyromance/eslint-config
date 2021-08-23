/**
 *  eslint
 *  @babel/eslint-parser  @babel/core  @babel/preset-react
 *  typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
 *  svelte eslint-plugin-svelte3
 *  vue-eslint-parser eslint-plugin-vue
 */
module.exports = {
  root: true,
  // parser: "espree", // 如果不指定就是使用默认的espree插件
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module", // 指定写的代码是模块
    ecmaFeatures: {
      impliedStrict: true, // 开启全局 script 模式
      globalReturn: false, // 不允许 return 语句出现在 global 环境下
      jsx: true, // 让 espree 能解析jsx
    },
  },
  env: {
    es6: true,
    browser: true,
  },
  globals: {},
  settings: {},
  plugins: [
    "@typescript-eslint", // 提供rules，有些规则需要对应的parser; 如果不需要用到typescript的规则，可以关闭它
    "vue", // 提供processor、rules，需要对应的parser；processor不会区分文件；
    "svelte3", // 提供processor
    // "react", // 提供rules，不需要特定parser;
  ],
  overrides: [
    // {
    //   files: ["*.js", "*.jsx"],
    //   parser: "@babel/eslint-parser", // 如果要用这个paser，必须依赖@babel/core(eslint-parser就是调用的它)
    //   parserOptions: {
    //     babelOptions: {
    //       // presets: [
    //       //   "@babel/preset-react", // 必须这么配置，让 @babel/eslint-parser 解析jsx语法。
    //       // ],
    //       parserOpts: { // 这个配置是传给 @babel/parser的
    //         plugins: ["jsx"], // 这么写好一点，不用安装 preset-react
    //       },
    //     },
    //     requireConfigFile: false, // 让 @babel/eslint-parser 如果找不到.babelrc ，也不会报错
    //     allowImportExportEverywhere: false, // 仅允许 import export 语句出现在模块的顶层
    //   },
    // },
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser", // 如果不需要用到typescript的规则，可以关闭它
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      // 这里的规则对 .vue没有效果
      rules: {
        "valid-jsdoc": 0,
        // "@typescript-eslint/no-unused-vars": "error",
        // "@typescript-eslint/require-await": "error",
      },
    },
    {
      files: ["*.vue"],
      // processor: 'vue/.vue', // 不需要指定，因为vue插件中提供了 .vue 文件对应的 processor
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        project: ["./tsconfig.json"],
        extraFileExtensions: [".vue"],
      },
      rules: {
        "@typescript-eslint/no-unused-vars": "error", // 可以不用typescript-eslint/parser
        "@typescript-eslint/require-await": "error", // 必须使用typescript-eslint/parser，并且要指定 tsconfig.json
      },
    },
    {
      files: ["*.svelte"],
      parser: "@typescript-eslint/parser",
      parserOptions: { // add these parser options
        // tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.svelte'],
      },
      processor: "svelte3/svelte3", // 必须要指定，因为插件只是提供了processor，没有指定后缀。
      // sevlet processor 除了分析script，还可以分析style、template
      settings: {
        "svelte3/ignore-styles": (attributes) => {
          // 默认不写lang是，attributes是{}
          return ["less", "sass", "scss"].includes(attributes.lang);
        },
        "svelte3/compiler-options": {
          customElement: true,
        },
        "svelte3/ignore-warnings": (warning) => {
          return ["custom-element-no-tag"].includes(warning.code);
        },
        "svelte3/typescript": true,
      },
      rules: {
        "no-unused-vars": "error",
        // "@typescript-eslint/require-await": "error",
      },
    },
  ],
  rules: {
    semi: ["error", "always"], // prettier
    "arrow-spacing": 2, // prettier
    "block-spacing": 2, // prettier
    "new-parens": 2, // prettier
    "no-tabs": 2, // prettier
    "id-match": ["error", "^[A-Za-z_$]\\w*(?<![0-9]{3,})$"],
    "valid-jsdoc": 2,
    "require-jsdoc": [
      "error",
      {
        require: {
          FunctionDeclaration: true,
          ClassDeclaration: true,
          MethodDefinition: true,
          ArrowFunctionExpression: true,
          FunctionExpression: true,
        },
      },
    ],
    "func-names": ["error", "as-needed"],
    "no-nested-ternary": 2,
    eqeqeq: 2,
    "for-direction": 2,
    "func-call-spacing": 2,
    "func-name-matching": 2,
    "max-depth": ["error", 4],
    "max-lines": ["error", 2000],
    "max-nested-callbacks": ["error", 5],
    "max-params": ["error", 10],
    "max-statements": ["error", 50],
    "new-cap": 2,
    "no-alert": 2,
    "no-debugger": 2,
    "no-dupe-class-members": 2,
    "no-dupe-keys": 2,
    "no-eval": 2,
    "no-proto": 2,
    "require-await": 2,
    "require-yield": 2,
    "block-scoped-var": 2,
    "no-confusing-arrow": 2,
    "no-buffer-constructor": 2,
  },
};
