module.exports = (() => {
  if (false) {
    return {
      presets: ['module:@react-native/babel-preset'],
      plugins: [['transform-remove-console', {exclude: ['error', 'warn', 'log']}]],
    };
  } else {
    return {
      presets: ['module:@react-native/babel-preset'],
      plugins: [
        [
          'module-resolver',
          {
            root: ['./src'],
            alias: {
              screens: './src/screens',
              components: './src/components',
              navigators: './src/navigators',
              routes: './src/routes',
              contexts: './src/contexts',
              assets: './src/assets',
              hooks: './src/hooks',
            },
          },
        ],
      ],
    };
  }
})();
