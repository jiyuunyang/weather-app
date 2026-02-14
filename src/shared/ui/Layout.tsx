interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className='flex flex-col w-full max-w-7xl mx-auto p-4'>{children}</div>
  );
}
