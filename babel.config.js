module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', 
    ['module:react-native-dotenv', {
      moduleName: '@env',  // The name to import the environment variables
      path: '.env',        // Path to your .env file
    }]
  ]
};
