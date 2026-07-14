import React from 'react'

const StateCard = ({title, value, icon:Icon}) => {
  return (
    <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm text-slate-500 font-medium'>{title}</p>
          <h2 className='mt-2 text-4xl font-bold text-slate-800'>{value}</h2>
        </div>

        <div className='rounded-xl bg-orange-100 p-3'>
          <Icon size={28} className="text-orange-500" />
        </div>
      </div>
    </div>
  )
}

export default StateCard
