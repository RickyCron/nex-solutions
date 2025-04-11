import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 5000,
        style: {
          background: '#0D0B0B',
          color: '#EEEEEE',
          border: '1px solid rgba(204, 74, 74, 0.3)',
          backdropFilter: 'blur(8px)',
        },
        success: {
          iconTheme: {
            primary: '#CC4A4A',
            secondary: '#EEEEEE',
          },
        },
        error: {
          iconTheme: {
            primary: '#CC4A4A',
            secondary: '#EEEEEE',
          },
        },
      }}
    />
  );
}