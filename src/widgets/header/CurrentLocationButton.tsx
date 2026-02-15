import { useCurrentLocation } from '@/features/get-location/model/useCurrentLocation';
import { MdOutlineLocationSearching } from 'react-icons/md';

export default function CurrentLocationButton() {
  const { updateCurrentLocation } = useCurrentLocation();

  return (
    <button
      onClick={updateCurrentLocation}
      className='relative inline-block group p-2 mr-3 rounded-full bg-card-highlight dark:bg-card-background-dark shadow-md cursor-pointer'
    >
      <MdOutlineLocationSearching className='text-lg' />
      {/* 툴팁 */}
      <div
        className='absolute top-full left-1/2 transform -translate-x-1/2 
                    w-max max-w-xs bg-black text-white text-sm rounded-md px-1 py-0.5 mt-1
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10'
      >
        현재 위치로
      </div>
    </button>
  );
}
