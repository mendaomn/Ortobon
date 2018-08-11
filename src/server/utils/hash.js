let furl = undefined

class Hash {
  static setFurl( fn ) {
    furl = fn
  }

  static init( dust ) {
    dust.helpers.hash = (chunk, context, bodies, params) => {
      const filePath = params.path;
      if (furl) {
        let url = furl(filePath)
        if (typeof url !== 'string') {
          url = url.href
        } else {
          url = '/static' + url
        }
        return chunk.map(chunk => chunk.write(url).end()) 
      } else {
        console.warn('No furl found')
        return chunk
      }
    }
  }
}

module.exports = Hash 