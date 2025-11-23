interface SectionHeaderProps {
  title: string;
  eyebrow?: string;
  description?: string;
  actions?: React.ReactNode;
}

export function SectionHeader({ title, eyebrow, description, actions }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        ) : null}
        <h2 className="section-title">{title}</h2>
        {description ? (
          <p className="mt-3 max-w-3xl text-base text-slate-300">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
    </div>
  );
}
