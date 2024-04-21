import React from 'react'

const Reader = () => {
  return (
    <div>
          <object data="myfile.pdf" type="application/pdf" width="100%" height="100%">
              <p>Alternative text - include a link <a href="myfile.pdf">to the PDF!</a></p>
          </object>
    </div>
  )
}

export default Reader