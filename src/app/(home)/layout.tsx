import HomeShell from '@/components/layouts/home-shell';

export default async function RootLayout(props: { children: React.ReactNode }) {
  return <HomeShell>{props.children}</HomeShell>;
}
