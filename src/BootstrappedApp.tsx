import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import App from './App';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './services/redux';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

export const BootstrappedApp: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
