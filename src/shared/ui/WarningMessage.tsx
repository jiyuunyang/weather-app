type WarningMessageProps = {
  message: string;
};

export default function WarningMessage({ message }: WarningMessageProps) {
  return (
    <div
      className='mt-5 mb-10 bg-yellow-300/30 dark:bg-yellow-300/70 
    border border-yellow-300 px-4 py-3 rounded-xl shadow-md flex items-start'
    >
      <p className='whitespace-pre-line text-sm text-yellow-600 dark:text-yellow-900'>
        {message}
      </p>
    </div>
  );
}
