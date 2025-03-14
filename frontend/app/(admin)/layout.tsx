import SidebarAdmin from "@/components/admin/SidebarAdmin";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex bg-gray-200 h-screen">
      <SidebarAdmin />
      <section className="overflow-y-scroll w-3/4">{children}</section>
    </main>
  );
}
