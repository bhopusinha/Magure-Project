import { ChangeEvent } from 'react'
import { optionType } from '../types'

interface propsType {
    term: string,
    options: [],
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onOptionSelect: (option: optionType) => void,
    onSubmit: () => void
}

const Search = ({ term, onInputChange, options, onOptionSelect, onSubmit }: propsType) => {


    return (
        <section className='w-full md:max-w-[500px]p-4 flex flex-col bg-white bg-opacity-20 backdrop-blur-ls drop-shadow-lg rounded text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] text-zinc-700'>
            <h1 className='text-4xl font-thin'>Weather <span className='font-black'> Forecast</span> </h1>
            <p className='text-sm mt-2'>
                Enter below a place you want to know the weather of and select an option from the dropdown
            </p>
            <div className='relative flex mt-10 md:mt-1'>
                <input type="text" value={term} onChange={onInputChange} className='px-2 py-1 rounder-l-md
   border-2 border-white' />

                <ul className='absolute top-9 bg-white ml-1 rounded-b-md'>
                    {
                        options.map((options: optionType, index: number) => (
                            <li key={options.name + '-' + index}>
                                <button className='text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer' onClick={() => onOptionSelect(options)}>
                                    {options.name} {options.country}
                                </button>
                            </li>
                        ))
                    }
                </ul>

                <button className='rounded-r-md px-2 py-1 border-zinc-100 border-2 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 cursor-pointer ' onClick={onSubmit} >Search</button>
            </div>

        </section>
    )
}

export default Search
