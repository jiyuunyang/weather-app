// features/search/ui/SearchInput.tsx
import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import koreaDistrictsXY from '@/entities/location/data/korea_districts_with_xy.json';
import { useLocationStore } from '@/entities/location/model/locationStore';

const normalize = (str: string) => str.trim().replace(/\s+/g, ' ');

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const { selectedLocation, setSelectedLocation } = useLocationStore();

  // 모바일 오버레이 열릴 때 스크롤 잠금
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // 입력 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setFilteredLocations([]);
      setActiveIndex(-1);
      return;
    }

    const filtered = koreaDistrictsXY
      .map((d) => d.name.replaceAll('-', ' '))
      .filter((name) =>
        normalize(name).toLowerCase().includes(normalize(value).toLowerCase()),
      );

    setFilteredLocations(filtered);
    setActiveIndex(-1);
  };

  // 항목 선택
  const handleSelect = (loc: string) => {
    const matched = koreaDistrictsXY.find(
      (d) => normalize(d.name.replaceAll('-', ' ')) === normalize(loc),
    );

    if (matched) {
      setSelectedLocation(matched);
      setQuery(loc);
      setFilteredLocations([]);
      setActiveIndex(-1);
      setIsOpen(false);
    }
  };

  // 키보드 이벤트
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredLocations.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < filteredLocations.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : filteredLocations.length - 1,
      );
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0) {
        handleSelect(filteredLocations[activeIndex]);
      } else if (query.trim() !== '') {
        handleSelect(query);
      }
    } else if (e.key === 'Escape') {
      setFilteredLocations([]);
      setActiveIndex(-1);
      setIsOpen(false);
    }
  };

  const showNoResults =
    query.trim() !== '' &&
    filteredLocations.length === 0 &&
    selectedLocation?.name !== query.trim().replaceAll(' ', '-');

  return (
    <>
      {/* 모바일 돋보기 버튼 */}
      <button
        className='md:hidden p-2 ml-auto mr-3 rounded-full bg-card-highlight dark:bg-card-background-dark shadow-md'
        onClick={() => setIsOpen(true)}
      >
        <FiSearch className='text-lg' />
      </button>

      {/* PC 검색창 */}
      <div className='hidden md:block relative w-full max-w-lg'>
        <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500' />
        <input
          type='text'
          placeholder='지역 검색...'
          value={query}
          onChange={handleChange}
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
          className='fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-8'
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
                onChange={handleChange}
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
