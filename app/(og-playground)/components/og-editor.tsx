"use client";
import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabImages from "./tab-images";

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
    triggerValue: "editor",
    triggerLabel: "Editor",
    triggerContent: <div>This is for Editor!</div>,
    disabled: true,
  },
];

export default function OGPlayground() {
  return (
    <Tabs defaultValue="images" className="w-[600px]">
      <TabsList>
        {TAB_ITEMS.map((tab) => {
          return (
            <TabsTrigger disabled={tab.disabled} value={tab.triggerValue}>
              {tab.triggerLabel}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {TAB_ITEMS.map((tab) => {
        return (
          <TabsContent className="mt-6" value={tab.triggerValue}>
            {tab.triggerContent}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
