import { formatValue } from '../lib/formatValue';
import type { ForecastByTime } from '../model/types';
import { WeatherEmoji } from './WeatherEmoji';

interface MainWeatherCardProps {
  currentDistrict: string;
  now: string;
  ultraShortData: Record<string, string>;
  shortTermData: ForecastByTime[];
}

export default function MainWeatherCard({
  currentDistrict,
  now,
  ultraShortData,
  shortTermData,
}: MainWeatherCardProps) {
  return (
    <section className='bg-card-background dark:bg-card-background-dark rounded-3xl p-6 shadow-xl mb-10'>
      <div className='flex justify-between items-start'>
        <div>
          <h1 className='text-2xl font-semibold'>📍 {currentDistrict}</h1>
          <p className='text-sm text-gray-400 ml-8 mt-2'>{now}</p>
          <div className='mt-6 flex items-center gap-4'>
            <span className='text-6xl font-bold'>
              {formatValue(ultraShortData?.T1H || '0')}°
            </span>
            <div>
              <WeatherEmoji
                ptyCode={Number(ultraShortData?.PTY)}
                skyCode={Number(shortTermData?.[0]?.data?.SKY)}
              />
              <div className='text-sm text-gray-400'>
                H: {shortTermData?.[0]?.data?.TMX || '-'}° • L:
                {shortTermData?.[0]?.data?.TMN || '-'}°
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-3 text-center'>
          <div className='bg-card-highlight dark:bg-card-background-dark px-4 py-3 rounded-xl'>
            <p className='text-gray-400 text-sm'>습도</p>
            <p className='text-lg font-semibold'>
              {ultraShortData?.REH || '-'}%
            </p>
          </div>
          <div className='bg-card-highlight dark:bg-card-background-dark px-4 py-3 rounded-xl'>
            <p className='text-gray-400 text-sm'>풍속</p>
            <p className='text-lg font-semibold'>
              {ultraShortData?.WSD || '-'} km/h
            </p>
          </div>
        </div>
      </div>
      <div className='mt-8 border-t border-gray-700 pt-6'>
        <div className='flex gap-6 overflow-x-auto whitespace-nowrap'>
          {shortTermData?.map((item, i) => (
            <div key={i} className='flex flex-col items-center text-sm'>
              <span className='text-gray-400'>{item.fcstTime}</span>
              <WeatherEmoji
                ptyCode={Number(item.data?.PTY)}
                skyCode={Number(item.data?.SKY)}
              />
              <span>{item.data?.TMP || '-'}°</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
