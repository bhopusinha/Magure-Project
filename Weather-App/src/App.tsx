import './App.css'
import Forcaste from './components/Forcaste';
import Search from './components/Search';
import SearchHooks from './hooks/SearchHooks';
function App() {

  const { term, forCaste, onInputChange, onOptionSelect, onSubmit, options } = SearchHooks();

  return (
    <main className='flex justify-center items-center bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full overflow-scroll'>
      {
        forCaste ? (
          <Forcaste data={forCaste} />
        ) : (
          <Search term={term} options={options} onInputChange={onInputChange} onOptionSelect={onOptionSelect} onSubmit={onSubmit} />
        )
      }
    </main>
  )
}

export default App
