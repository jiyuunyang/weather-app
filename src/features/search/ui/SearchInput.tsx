export default function SearchInput() {
  return (
    <input
      type='text'
      placeholder='지역 검색...'
      className='w-full max-w-[320px] px-4 py-2 rounded-xl bg-[#0F1C2E] 
                 text-white placeholder-gray-400 focus:outline-none 
                 focus:ring-2 focus:ring-blue-500'
    />
  );
}
