import { QueryProvider } from './providers/QueryProvider';

const App = () => {
  return (
    <QueryProvider>
      <div className='min-h-screen bg-slate-50'>
        <header className='p-4 bg-white shadow-sm'>
          <h1 className='text-xl font-bold text-primary'>Weather Cast</h1>
        </header>

        <main className='p-4'>
          <p>날씨 앱 준비 완료!</p>
        </main>
      </div>
    </QueryProvider>
  );
};

export default App;
