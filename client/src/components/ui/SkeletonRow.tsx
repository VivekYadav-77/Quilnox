interface SkeletonRowProps {
  columns?: number;
}

const widths = [150, 220, 96, 92, 130, 80];

const SkeletonRow = ({ columns = 6 }: SkeletonRowProps) => {
  return (
    <tr style={{ borderBottom: '1px solid var(--border)' }}>
      {Array.from({ length: columns }, (_item, index) => (
        <td key={index} className="px-4 py-4">
          <div
            className="h-3.5 rounded"
            style={{
              width: widths[index] || 100,
              maxWidth: '100%',
              background:
                'linear-gradient(90deg, var(--surface-3) 25%, var(--surface-4) 50%, var(--surface-3) 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
              animationDelay: `${index * 80}ms`,
            }}
          />
        </td>
      ))}
    </tr>
  );
};

export default SkeletonRow;
