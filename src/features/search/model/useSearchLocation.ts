import { useState } from 'react';
import koreaDistrictsXY from '@/entities/location/data/korea_districts_with_xy.json';
import { useLocationStore } from '@/entities/location/model/locationStore';

const normalize = (str: string) => str.trim().replace(/\s+/g, ' ');

export function useSearchLocation() {
  const [query, setQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const { setSelectedLocation } = useLocationStore();

  const handleChange = (value: string) => {
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

  const handleSelect = (loc: string) => {
    const matched = koreaDistrictsXY.find(
      (d) => normalize(d.name.replaceAll('-', ' ')) === normalize(loc),
    );
    if (matched) {
      setSelectedLocation(matched);
      setQuery('');
      setFilteredLocations([]);
      setActiveIndex(-1);
      setIsOpen(false);
    }
  };

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
      else if (query.trim() !== '') handleSelect(query);
    } else if (e.key === 'Escape') {
      setFilteredLocations([]);
      setActiveIndex(-1);
      setIsOpen(false);
    }
  };

  return {
    query,
    setQuery,
    filteredLocations,
    activeIndex,
    isOpen,
    setIsOpen,
    setActiveIndex,
    handleChange,
    handleSelect,
    handleKeyDown,
    showNoResults: query.trim() !== '' && filteredLocations.length === 0,
  };
}
