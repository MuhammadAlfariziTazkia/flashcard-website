'use client';

import SessionLayout from "@/components/SessionLayout";

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div lang="en">
        <SessionLayout>{children}</SessionLayout>
      </div>
    );
  }
  