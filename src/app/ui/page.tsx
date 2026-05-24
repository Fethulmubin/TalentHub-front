"use client";

import { useState } from "react";
import { Button } from "@/components/system/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/system/card";
import { Badge } from "@/components/system/badge";
import { Input } from "@/components/system/input";
import { Textarea } from "@/components/system/textarea";
import { Select } from "@/components/system/select";
import { Avatar } from "@/components/system/avatar";
import { Skeleton, SkeletonCard } from "@/components/system/skeleton";
import { Progress } from "@/components/system/progress";
import { Tooltip } from "@/components/system/tooltip";
import { Dialog } from "@/components/system/dialog";
import { Modal } from "@/components/system/modal";
import { Drawer } from "@/components/system/drawer";
import { EmptyState } from "@/components/system/empty-state";
import { RetryState } from "@/components/system/retry-state";
import { StatCard } from "@/components/system/stat-card";
import { Breadcrumbs } from "@/components/system/breadcrumbs";
import { Timeline, TimelineItem } from "@/components/system/timeline";
import {
  Bell, User, Settings, Home, Mail, Search, Star, Upload, Download, Trash2, Edit3, Plus, Check, X, AlertTriangle, Info, Moon, Sun, Gift, Key, ShieldAlert, Link2, ExternalLink, Eye, EyeOff, Heart, Share2, MoreHorizontal, Briefcase,
} from "lucide-react";

const section = (title: string, children: React.ReactNode) => (
  <div className="space-y-4">
    <h2 className="text-base font-semibold text-foreground border-b border-border pb-2">{title}</h2>
    {children}
  </div>
);

const grid = (cols: string, children: React.ReactNode) => (
  <div className={`grid ${cols} gap-3`}>{children}</div>
);

export default function UIShowcase() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12 space-y-10">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">UI Component Showcase</h1>
        <p className="text-sm text-muted-foreground">All system components with their variants — interactive.</p>
      </div>

      <Breadcrumbs items={[{ label: "UI Showcase" }]} />

      {/* BUTTONS */}
      {section("Buttons", (
        <div className="space-y-4">
          {grid("grid-cols-2 sm:grid-cols-4 lg:grid-cols-6", ["default", "secondary", "outline", "ghost", "destructive", "link", "success"].map((v) => (
            <Button key={v} variant={v as any} size="sm">{v}</Button>
          )))}
          {grid("grid-cols-2 sm:grid-cols-4 lg:grid-cols-6", ["xs", "sm", "default", "lg", "xl"].map((s) => (
            <Button key={s} size={s as any}>size-{s}</Button>
          )))}
          {grid("grid-cols-2 sm:grid-cols-4", [
            { label: "Loading", props: { loading: true } },
            { label: "Disabled", props: { disabled: true } },
            { label: "Icon", props: { size: "icon" as const, children: <Bell size={14} /> } },
            { label: "Icon+Text", props: { children: <><Plus size={14} /> Add</> } },
          ].map(({ label, props }) => (
            <Button key={label} {...(props as any)}>{label === "Icon" || label === "Icon+Text" ? props.children : label}</Button>
          )))}
        </div>
      ))}

      {/* BADGES */}
      {section("Badges", (
        <div className="space-y-3">
          {grid("grid-cols-3 sm:grid-cols-4 lg:grid-cols-8", ["default", "secondary", "destructive", "outline", "success", "warning", "info", "soft"].map((v) => (
            <Badge key={v} variant={v as any}>{v}</Badge>
          )))}
          {grid("grid-cols-3 sm:grid-cols-6", ["sm", "default", "lg"].map((s) => (
            <Badge key={s} size={s as any}>size-{s}</Badge>
          )))}
        </div>
      ))}

      {/* CARDS */}
      {section("Cards", (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader><CardTitle>Simple Card</CardTitle><CardDescription>With description</CardDescription></CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">Card content goes here. This is a basic card layout.</p></CardContent>
            <CardFooter><Button size="sm">Action</Button></CardFooter>
          </Card>
          <Card className="flex flex-col items-center text-center py-8">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"><Star size={20} /></div>
            <CardTitle>Centered Card</CardTitle>
            <CardContent><p className="text-sm text-muted-foreground">A card with centered content.</p></CardContent>
          </Card>
          <Card className="border-dashed">
            <CardHeader><CardTitle>Dashed Border</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">Alternate style with dashed border.</p></CardContent>
          </Card>
        </div>
      ))}

      {/* INPUTS */}
      {section("Inputs & Forms", (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Input label="Default Input" placeholder="Placeholder text" />
            <Input label="With Error" placeholder="Invalid value" error="This field is required" />
            <Input label="Left Icon" placeholder="Search..." leftIcon={<Search size={14} />} />
            <Input label="Right Icon" placeholder="Clearable" rightIcon={<X size={14} />} />
            <Input label="Disabled" disabled value="Disabled content" />
          </div>
          <div className="space-y-3">
            <Textarea label="Textarea" placeholder="Write something..." rows={3} />
            <Textarea label="With Error" placeholder="Invalid..." error="Please provide more detail" />
            <Select label="Select" placeholder="Choose an option" options={[{ value: "1", label: "Option 1" }, { value: "2", label: "Option 2" }, { value: "3", label: "Option 3" }]} />
            <Select label="With Error" error="Please select" placeholder="Choose..." options={[{ value: "a", label: "Alpha" }, { value: "b", label: "Beta" }]} />
          </div>
        </div>
      ))}

      {/* AVATARS */}
      {section("Avatars", (
        <div className="flex items-end gap-4">
          <Avatar size="sm" fallback="JD" />
          <Avatar size="default" fallback="JD" />
          <Avatar size="lg" fallback="JD" />
          <Avatar size="xl" fallback="JD" />
          <Avatar size="lg" fallback="Jane Doe" alt="Jane Doe" />
          <Avatar size="lg" fallback="Admin" className="bg-primary/10 text-primary" />
        </div>
      ))}

      {/* TOOLTIP + DIALOG + MODAL + DRAWER */}
      {section("Overlays", (
        <div className="flex flex-wrap gap-3">
          <Tooltip content="Hello from tooltip!" side="top">
            <Button variant="outline" size="sm">Hover Me (Top)</Button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" side="bottom">
            <Button variant="outline" size="sm">Hover (Bottom)</Button>
          </Tooltip>
          <Button onClick={() => setDialogOpen(true)} size="sm">Open Dialog</Button>
          <Button onClick={() => setModalOpen(true)} size="sm">Open Modal</Button>
          <Button onClick={() => setDrawerOpen(true)} size="sm">Open Drawer</Button>
        </div>
      ))}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} onConfirm={() => setDialogOpen(false)} title="Confirm Action" description="Are you sure you want to proceed with this action?" variant="destructive" confirmText="Delete" />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Modal Title" description="This is a modal with more content.">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Modal content area. You can put any content here.</p>
          <Input placeholder="Type something..." />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setModalOpen(false)}>Save</Button>
          </div>
        </div>
      </Modal>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Drawer Panel">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">This is a side drawer panel. Useful for settings, details, or filters.</p>
          <Input label="Search" placeholder="Filter..." />
          <div className="space-y-2">
            {["Item 1", "Item 2", "Item 3"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="text-sm">{item}</span>
                <Button variant="ghost" size="icon-sm"><Eye size={14} /></Button>
              </div>
            ))}
          </div>
        </div>
      </Drawer>

      {/* PROGRESS */}
      {section("Progress", (
        <div className="space-y-4 max-w-md">
          <Progress value={25} size="sm" />
          <Progress value={50} size="default" />
          <Progress value={75} size="lg" />
          <Progress indeterminate size="sm" />
        </div>
      ))}

      {/* SKELETONS */}
      {section("Skeletons", (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <div className="space-y-3 p-4 rounded-xl border border-border">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      ))}

      {/* STAT CARDS */}
      {section("Stat Cards", (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Users" value="2,847" icon={<User size={16} />} trend={{ direction: "up", value: "12%" }} />
          <StatCard title="Applications" value="1,023" icon={<Mail size={16} />} trend={{ direction: "up", value: "8%" }} />
          <StatCard title="Active Jobs" value="45" icon={<Briefcase size={16} />} />
          <StatCard title="Bounce Rate" value="3.2%" icon={<AlertTriangle size={16} />} trend={{ direction: "down", value: "1.1%" }} />
        </div>
      ))}

      {/* EMPTY & RETRY STATES */}
      {section("Empty & Error States", (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <EmptyState icon={<Search size={24} />} title="No results found" description="Try adjusting your search or filters to find what you're looking for." action={{ label: "Clear Filters", onClick: () => {} }} />
          <RetryState title="Failed to load data" description="An unexpected error occurred. Please try again." onRetry={() => {}} />
        </div>
      ))}

      {/* TIMELINE */}
      {section("Timeline", (
        <div className="max-w-lg">
          <Timeline>
            <TimelineItem title="Application Submitted" description="Your application has been received" timestamp="2 hours ago" completed icon={<Check size={12} />} />
            <TimelineItem title="Under Review" description="Employer is reviewing your application" timestamp="1 hour ago" active icon={<Eye size={12} />} />
            <TimelineItem title="Interview" description="Awaiting response from employer" icon={<Star size={12} />} />
            <TimelineItem title="Decision" description="Final outcome pending" icon={<ShieldAlert size={12} />} />
          </Timeline>
        </div>
      ))}

      {/* BREADCRUMBS */}
      {section("Breadcrumbs", (
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Jobs" },
          { label: "Senior Engineer", href: "#" },
          { label: "Applications" },
        ]} />
      ))}
    </div>
  );
}


