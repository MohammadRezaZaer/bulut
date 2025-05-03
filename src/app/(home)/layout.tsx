import HomeShell from '@/components/layouts/home-shell';
import {isAuthenticated} from "@/lib/auth";
export default async function RootLayout(props: { children: React.ReactNode }) {

  const auth_token = isAuthenticated();
  return <HomeShell isAuthenticated={auth_token}>{props.children}</HomeShell>;
}