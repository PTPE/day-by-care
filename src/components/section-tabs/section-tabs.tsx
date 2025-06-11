'use client';

import { useTransition } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import LoadingSpinner from '@/ui/loading-spinner';

import Tab from './_tab';

type TabId = string;

interface TabType {
  id: TabId;
  label: string;
}

interface SectionTabsProps {
  tabs: TabType[];
  defaultTabId?: TabId;
}

export default function SectionTabs({ tabs, defaultTabId }: SectionTabsProps) {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedSectionId =
    searchParams.get('tab') || defaultTabId || tabs[0].id;
  const pathname = usePathname();

  const handleTabChange = (tabId: TabId) => {
    startTransition(() => {
      router.push(`${pathname}?tab=${tabId}`);
    });
  };

  return (
    <div className="bg-tertiary p-2 rounded-lg flex">
      {isPending && <LoadingSpinner />}
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          selected={selectedSectionId === tab.id}
          onClick={() => handleTabChange(tab.id)}
        >
          {tab.label}
        </Tab>
      ))}
    </div>
  );
}
