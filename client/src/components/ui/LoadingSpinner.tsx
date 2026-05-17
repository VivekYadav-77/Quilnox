const LoadingSpinner = () => {
  return (
    <span
      className="inline-block h-5 w-5 animate-spin rounded-full border-2"
      style={{ borderColor: 'var(--surface-4)', borderTopColor: 'var(--accent)' }}
    />
  );
};

export default LoadingSpinner;
