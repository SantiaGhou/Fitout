import React, { createContext, useContext, useState, useCallback } from 'react';

type ModalType = 'success' | 'error' | 'warning' | 'info';

interface ModalOptions {
  title?: string;
  message: string;
  type?: ModalType;
}

interface ModalContextData {
  showModal: (options: ModalOptions) => void;
}

const ModalContext = createContext<ModalContextData | null>(null);

interface ModalState extends ModalOptions {
  open: boolean;
}

const iconMap: Record<ModalType, React.ReactNode> = {
  success: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
  ),
  info: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20A10 10 0 0112 2z" />
    </svg>
  ),
};

const colorMap: Record<ModalType, string> = {
  success: 'text-green-400 bg-green-400/10',
  error: 'text-red-400 bg-red-400/10',
  warning: 'text-yellow-400 bg-yellow-400/10',
  info: 'text-blue-400 bg-blue-400/10',
};

const defaultTitles: Record<ModalType, string> = {
  success: 'Sucesso',
  error: 'Erro',
  warning: 'Atenção',
  info: 'Informação',
};

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalState>({
    open: false,
    message: '',
    type: 'info',
  });

  const showModal = useCallback(({ title, message, type = 'info' }: ModalOptions) => {
    setModal({ open: true, title, message, type });
  }, []);

  const closeModal = useCallback(() => {
    setModal((prev) => ({ ...prev, open: false }));
  }, []);

  const type = modal.type ?? 'info';
  const title = modal.title ?? defaultTitles[type];

  return (
    <ModalContext.Provider value={{ showModal }}>
      {children}

      {modal.open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal */}
          <div className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-4 animate-fade-in-scale">
            {/* Icon + Title */}
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${colorMap[type]}`}>
                {iconMap[type]}
              </div>
              <h2 id="modal-title" className="text-white font-semibold text-lg">
                {title}
              </h2>
            </div>

            {/* Message */}
            <p className="text-gray-300 text-sm leading-relaxed">
              {modal.message}
            </p>

            {/* Action */}
            <div className="flex justify-end pt-1">
              <button
                onClick={closeModal}
                className="px-5 py-2 rounded-lg bg-[#F74D00] text-white text-sm font-medium hover:bg-[#e04400] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F74D00]/50"
                autoFocus
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextData {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}
