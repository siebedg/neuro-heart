const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

let config = getDefaultConfig(__dirname)

module.exports = withNativeWind(config, { input: './app/global.css' })