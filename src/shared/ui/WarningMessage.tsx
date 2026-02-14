type WarningMessageProps = {
  message: string;
};

export default function WarningMessage({ message }: WarningMessageProps) {
  return (
    <div className='w-full bg-yellow-300/60 border border-yellow-300 px-4 py-3 rounded-xl shadow-md flex items-center'>
      <p className='whitespace-pre-line text-sm text-yellow-700 mt-1'>
        {message}
      </p>
    </div>
  );
}
