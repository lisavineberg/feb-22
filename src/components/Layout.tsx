import { Nav } from './Nav';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
}

export default Layout;
