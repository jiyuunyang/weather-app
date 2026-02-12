type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className='w-full bg-red-900/30 border border-red-600 text-red-300 px-4 py-3 rounded-xl shadow-md flex items-start gap-3'>
      <span className='text-red-400 text-xl'>⚠️</span>
      <div>
        <p className='font-semibold text-red-300'>Error</p>
        <p className='text-sm text-red-400 mt-1'>{message}</p>
      </div>
    </div>
  );
}
