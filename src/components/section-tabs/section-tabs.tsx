'use client';

import { useRouter, useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedSectionId =
    searchParams.get('tab') || defaultTabId || tabs[0].id;

  const handleTabChange = (tabId: TabId) => {
    router.push(`/dashboard/schedule?tab=${tabId}`);
  };

  return (
    <div className="bg-tertiary p-2 rounded-lg flex">
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
