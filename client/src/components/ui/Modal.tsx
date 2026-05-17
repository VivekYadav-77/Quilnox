import { useEffect } from 'react';
import type { ReactNode } from 'react';
import Button from './Button';
import { CloseIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizes: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

const Modal = ({ isOpen, onClose, title, children, size = 'md' }: ModalProps) => {
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen);

    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal"
      />
      <section className={`app-card relative w-full p-6 shadow-2xl shadow-black/50 animate-slide-up ${sizes[size]}`}>
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="font-display text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            {title}
          </h2>
          <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose} aria-label="Close">
            <CloseIcon className="h-4 w-4" />
          </Button>
        </div>
        {children}
      </section>
    </div>
  );
};

export default Modal;
