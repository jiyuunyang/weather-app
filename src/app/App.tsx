import Home from '@/pages/home/Home';
import { QueryProvider } from './providers/QueryProvider';

const App = () => {
  return (
    <QueryProvider>
      <Home />
    </QueryProvider>
  );
};

export default App;
