module.exports = (api) => {
  api.cache(true)
  
  return {
    presets: ['next/babel'],
    plugins: ['babel-plugin-styled-components']
  }
}