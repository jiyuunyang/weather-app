type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      className='mt-5 mb-10 bg-red-300/30 dark:bg-red-300/70 
    border border-red-300 text-red-300 px-4 py-3 rounded-xl shadow-md flex items-start gap-3'
    >
      <span className='text-red-400 text-xl'>⚠️</span>
      <div>
        <p className='font-semibold text-red-400 dark:text-red-700'>Error</p>
        <p className='mt-1 text-sm text-red-400 dark:text-red-700'>{message}</p>
      </div>
    </div>
  );
}
