import React from 'react'

type Props = {
  commentsInputValue,
  setCommentsInputValue
}

const TastingNotes = ({commentsInputValue, setCommentsInputValue}: Props) => {
  return (
    <div className='flex flex-col'>
        <h2>Tasting Notes</h2>
        <input type="date" id="start" name="trip-start"
       value="2023-06-25"></input>
        <textarea placeholder='notes' value={commentsInputValue} onChange={(e) => setCommentsInputValue(e.target.value)}/>
    </div>
  )
}

export default TastingNotes