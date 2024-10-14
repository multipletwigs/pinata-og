"use client";
import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabImages from "./tab-images";
import OGMetadataExport from "./og-metadata";
import { LucideLock } from "lucide-react";

interface TabItem {
  triggerValue: string;
  triggerLabel: string;
  triggerContent: ReactNode;
  disabled?: boolean;
}

const TAB_ITEMS: TabItem[] = [
  {
    triggerValue: "images",
    triggerLabel: "OG Image Builder",
    triggerContent: <TabImages />,
  },
  {
    triggerValue: "metadata",
    triggerLabel: "Metadata Editor",
    triggerContent: <OGMetadataExport />,
  },
  {
    triggerValue: "editor",
    triggerLabel: "OG Code Editor",
    triggerContent: <div>This is for Editor!</div>,
    disabled: true,
  },
];

export default function OGPlayground() {
  return (
    <Tabs defaultValue="images" className="w-full">
      <TabsList>
        {TAB_ITEMS.map((tab, index) => {
          return (
            <TabsTrigger
              key={`playground-tab-${tab.triggerValue}-${index}`}
              disabled={tab.disabled}
              value={tab.triggerValue}
            >
              {tab.disabled && <LucideLock className="w-4 h-4 mr-2" />}
              {tab.triggerLabel}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {TAB_ITEMS.map((tab, index) => {
        return (
          <TabsContent
            key={`playground-tab-item-${tab.triggerValue}-${index}`}
            className="mt-6"
            value={tab.triggerValue}
          >
            {tab.triggerContent}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
