import React from 'react'
import { isContext } from 'vm'
import Wind from './icons/Wind'
import Feels from './icons/Feels'
import Humidity from './icons/Humidity'
import Visibility from './icons/Visibiity'
import Pressure from './icons/Pressure'
import Pop from './icons/Pop'

type props = {
    icon: 'wind' | 'feels' | 'humidity' | 'visibility' | 'pressure' | 'pop',
    title: string,
    info: string | JSX.Element,
    description: string
}

const icons = {
    wind: Wind,
    feels: Feels,
    humidity: Humidity,
    visibility: Visibility,
    pressure: Pressure,
    pop: Pop
}

const Tile = ({ icon, title, info, description }: props): JSX.Element => {

    const Icon = icons[icon];

    return (
        <article className='w-[140px] h-[130px] text-zinc-700  font-bold flex flex-col bg-white/20 backdrop-blur-lg rounded drop-shadow-lg p-2 mb-5 justify-between'>

            <div className='flex items-center text-sm font-bold'>
                <Icon /> <h4 className='ml-1' >{title}</h4>
            </div>
            <h3 className='mt-2 text-lg' >{info}</h3>
            <p className='text-xs font-bold' >{description}</p>
        </article>
    )
}

export default Tile
