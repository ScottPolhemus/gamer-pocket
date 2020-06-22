self.addEventListener('fetch', (event) => {
  if (event.request.url.indexOf('save') !== -1) {
    event.respondWith(
      event.request.formData().then((formdata) => {
        const filename = formdata.get('filename')
        const body = formdata.get('filebody')
        
        const response = new Response(body)
        
        response.headers.append(
          'Content-Disposition',
          'attachment; filename="' + filename + '"'
        )
        
        return response
      })
    )
  }
})
