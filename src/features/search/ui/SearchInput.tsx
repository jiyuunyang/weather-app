// features/search/ui/SearchInput.tsx
import { useState, useRef, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import koreaDistrictsXY from '@/entities/location/data/korea_districts_with_xy.json';
import { useLocationStore } from '@/entities/location/model/locationStore';

const normalize = (str: string) => str.trim().replace(/\s+/g, ' ');

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedLocation, setSelectedLocation } = useLocationStore();

  // 검색어 입력
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
      if (activeIndex >= 0) handleSelect(filteredLocations[activeIndex]);
    } else if (e.key === 'Escape') {
      setFilteredLocations([]);
      setActiveIndex(-1);
    }
  };

  // 외부 클릭 시 리스트 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setFilteredLocations([]);
        setActiveIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // activeIndex 변경 시 스크롤 이동
  useEffect(() => {
    if (activeIndex < 0) return;
    const activeItem = document.getElementById(`loc-${activeIndex}`);
    activeItem?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  // 결과 없음 표시
  const showNoResults =
    query.trim() !== '' &&
    filteredLocations.length === 0 &&
    selectedLocation?.name !== query.trim().replaceAll(' ', '-');

  return (
    <div ref={containerRef} className='relative w-full max-w-[320px]'>
      {/* 돋보기 아이콘 */}
      <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500' />

      {/* 검색 input */}
      <input
        type='text'
        placeholder='지역 검색...'
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className='w-full pl-10 px-4 py-2 rounded-xl bg-card-highlight dark:bg-card-background-dark
                   placeholder-gray-400 focus:outline-none
                   focus:ring-2 focus:ring-primary focus:ring-offset-1'
      />

      {/* 자동완성 / 결과 없음 */}
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
  );
}
