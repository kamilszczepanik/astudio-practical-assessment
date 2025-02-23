export const PageTitle = ({ title }: { title: string }) => (
  <h1 className="mb-4 text-sm">
    Home / <span className="font-bold bg-custom-yellow">{title}</span>
  </h1>
);
