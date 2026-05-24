export default function JobRowSkeleton() {
  return (
    <tr className="border-b border-border last:border-0">
      {Array.from({ length: 4 }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 w-full max-w-[100px] rounded bg-muted animate-pulse-soft" />
        </td>
      ))}
    </tr>
  );
}
