export default function Footer() {
  return (
    <footer className='text-xs p-4 mt-auto text-center'>
      <p>
        이 사이트의 기상 정보는{' '}
        <a
          href='https://www.data.go.kr/data/15084084/openapi.do'
          target='_blank'
          rel='noopener noreferrer'
          className='no-underline hover:text-primary'
        >
          기상청 단기예보 조회서비스
        </a>{' '}
        를 통해 제공됩니다.
      </p>
      <p className='mt-1 text-gray-400 dark:text-gray-500'>
        &copy; {new Date().getFullYear()}{' '}
        <a
          href='https://github.com/jiyuunyang/weather-app'
          target='_blank'
          rel='noopener noreferrer'
          className='no-underline text-primary'
        >
          Weather App
        </a>{' '}
        All rights reserved.
      </p>
    </footer>
  );
}
