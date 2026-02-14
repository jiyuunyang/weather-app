import { FiSearch } from 'react-icons/fi';
import { useSearchLocation } from '../model/useSearchLocation';

export default function SearchInput() {
  const {
    query,
    filteredLocations,
    activeIndex,
    isOpen,
    setIsOpen,
    handleChange,
    handleSelect,
    handleKeyDown,
    showNoResults,
  } = useSearchLocation();

  return (
    <>
      {/* 모바일 돋보기 버튼 */}
      <button
        className='md:hidden relative inline-block group p-2 ml-auto mr-3 rounded-full bg-card-highlight dark:bg-card-background-dark shadow-md cursor-pointer'
        onClick={() => setIsOpen(true)}
      >
        <FiSearch className='text-lg' />
        {/* 툴팁 */}
        <div
          className='absolute top-full left-1/2 transform -translate-x-1/2 
                    w-max max-w-xs bg-black text-white text-sm rounded-md px-1 py-0.5 mt-1
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10'
        >
          검색하기
        </div>
      </button>

      {/* PC 검색창 */}
      <div className='hidden md:block relative w-full max-w-lg'>
        <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500' />
        <input
          type='text'
          placeholder='지역 검색...'
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className='w-full pl-10 pr-4 py-2 rounded-xl bg-card-highlight dark:bg-card-background-dark
                     placeholder-gray-400 focus:outline-none
                     focus:ring-2 focus:ring-primary focus:ring-offset-1'
        />

        {(filteredLocations.length > 0 || showNoResults) && (
          <ul
            role='listbox'
            className='absolute top-full mt-1 w-full bg-card-background dark:bg-card-background-dark
                       rounded-xl border border-card-highlight dark:border-card-highlight-dark
                       shadow-lg dark:shadow-[0_4px_6px_rgba(255,255,255,0.1)]
                       z-20 max-h-60 overflow-auto'
          >
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc, idx) => (
                <li
                  key={idx}
                  id={`loc-${idx}`}
                  role='option'
                  aria-selected={idx === activeIndex}
                  onClick={() => handleSelect(loc)}
                  className={`px-4 py-2 cursor-pointer hover:bg-card-highlight dark:hover:bg-card-highlight-dark
                      ${idx === activeIndex ? 'bg-card-highlight dark:bg-card-highlight-dark' : ''}`}
                >
                  {loc}
                </li>
              ))
            ) : (
              <li className='px-4 py-2 text-gray-500 dark:text-gray-400 cursor-default select-none'>
                해당 지역 정보가 없습니다
              </li>
            )}
          </ul>
        )}
      </div>

      {/* 모바일 전체 화면 오버레이 */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-8'
          onClick={() => setIsOpen(false)}
        >
          <div className='bg-card-background dark:bg-card-background-dark w-full max-w-md rounded-2xl shadow-lg p-4'>
            <div
              className='flex items-center mt-1 mb-6 relative'
              onClick={(e) => e.stopPropagation()}
            >
              <FiSearch className='absolute left-4 text-gray-400 dark:text-gray-500' />
              <input
                type='text'
                placeholder='지역 검색...'
                value={query}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className='flex-1 pl-10 pr-4 py-2 rounded-xl bg-card-highlight dark:bg-card-background-dark
                           placeholder-gray-400 focus:outline-none
                           focus:ring-2 focus:ring-primary focus:ring-offset-1'
              />
            </div>

            {(filteredLocations.length > 0 || showNoResults) && (
              <ul className='max-h-60 overflow-auto mt-2'>
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((loc, idx) => (
                    <li
                      key={idx}
                      onClick={() => handleSelect(loc)}
                      className='px-4 py-2 cursor-pointer hover:bg-card-highlight dark:hover:bg-card-highlight-dark'
                    >
                      {loc}
                    </li>
                  ))
                ) : (
                  <li className='px-4 py-2 text-gray-500 dark:text-gray-400 cursor-default select-none'>
                    해당 지역 정보가 없습니다
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
