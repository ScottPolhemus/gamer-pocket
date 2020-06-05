module.exports = (api) => {
  api.cache(true)

  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ['react-hot-loader/babel', 'styled-components'],
  }
}
