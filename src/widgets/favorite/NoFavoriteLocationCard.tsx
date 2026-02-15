export default function NoFavoriteLocationCard() {
  return (
    <div
      className='bg-card-background/40 rounded-2xl p-5 cursor-pointer
                dark:bg-card-background-dark/40'
    >
      <strong>즐겨찾는 지역이 없습니다.</strong>
      <p className='mt-2'>위치를 검색하여 즐겨찾기에 추가해보세요!</p>
    </div>
  );
}
