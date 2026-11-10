"use client";
export default function LogoutButton() {
  async function logout(){ await fetch("/api/admin/logout",{method:"POST"}); location.href="/admin/login"; }
  return <button className="secondary" onClick={logout}>Log out</button>;
}
