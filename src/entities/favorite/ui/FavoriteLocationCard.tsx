export default function FavoriteLocationCard() {
  return (
    <div className='bg-card-background dark:bg-card-background-dark rounded-2xl p-5'>
      <p className='text-sm text-gray-400'>Haeundae-gu</p>
      <h3 className='text-3xl font-semibold mt-2'>21°</h3>
      <p className='text-right text-gray-300 text-sm mt-6'>Clear Sky</p>
      <p className='text-right text-gray-500 text-xs'>23° / 19°</p>
    </div>
  );
}
