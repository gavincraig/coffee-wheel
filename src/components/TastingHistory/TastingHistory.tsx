import React from 'react'
import { TastingHistoryEntry } from '../../types'

type Props = {
  history: TastingHistoryEntry[] | never;
  setSelections: (selections:string[]) => void;
};

const HistoryEntry = ({historyEntry, setSelections}) => {
  return (
    <div className='flex flex-col p-2 bg-slate-700 shadow-md hover:shadow-lg hover:bg-slate-600 cursor-pointer' onClick={() => setSelections(historyEntry.details.flavors)}>
      <span className='text-xs font-light'>
        {historyEntry.details.date.toLocaleDateString('en-GB') }
        </span>
      <p>{historyEntry.details.comments}</p>
      <ul className='flex gap-2'>
        {historyEntry.details.flavors.map(flavor => <li className='text-sm'>{flavor}</li>)}
      </ul>
    </div>
  )
}

const TastingHistory = ({ history, setSelections }: Props) => {
  return (
    <div className='flex flex-col'>
        TastingHistory
        <ol className='flex flex-col gap-2'>
        {
          history?.map(entry => <li><HistoryEntry historyEntry={entry} setSelections={setSelections}/></li>)
        }
        </ol>   
    </div>
  )
}

export default TastingHistory