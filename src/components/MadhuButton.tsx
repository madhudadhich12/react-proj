import React from 'react'

const MadhuButton = () => {
  return (
    <>
      <div className="flex justify-center">
        <button>Button1</button>
      </div>


      <div className="flex flex-row">
        <button>Button2</button>
      </div>

      <div className="flex flex-col">
        <button>Button3</button>
      </div>

      <div className="flex flex-wrap">
        <button>Button4</button>
      </div>

    </>
  )
}

export default MadhuButton