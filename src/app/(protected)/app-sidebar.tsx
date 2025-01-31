"use client"

import { Bot, CreditCardIcon, FileIcon, LayoutDashboardIcon, PlusIcon, Presentation } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "~/components/ui/button"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "~/components/ui/sidebar"
import { cn } from "~/lib/utils"

export default function AppSidebar() {
    const pathname = usePathname()

    const items = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboardIcon,
        },
        {
            title: "Q&A",
            url: "/qa",
            icon: Bot,
        },
        {
            title: "Mettings",
            url: "/mettings",
            icon: Presentation,
        },
        {
            title: "Belling",
            url: "/belling",
            icon: CreditCardIcon,
        }
    ]

    const projects = [
        {
            name: "Project 1",
        },
        {
            name: "Project 2",
        },
        {
            name: "Project 3",
        }

    ]
    const {open} = useSidebar()

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                Logo
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Application
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>


                            {items.map((item, index) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.url}
                                            className={cn(
                                                "flex items-center gap-2",
                                                pathname === item.url && "text-primary font-medium bg-slate-600  hover:bg-slate-700 text-white "
                                            )}
                                        >
                                            <item.icon />
                                            {item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>
                        Your Projects
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {projects.map((project, index) => (
                                <SidebarMenuItem key={project.name}>
                                    <SidebarMenuButton asChild>
                                        <div>
                                            <div className={cn('rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary',
                                                { 'pg-primary text-black': true }
                                            )}>


                                                {project.name[0]}
                                            </div>
                                            {project.name}
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                            <div className="h-2"></div>
                            {open && (
                                <SidebarMenuItem>
                                    <Link href={'/create'}>
                                        <Button size={'sm'} variant={'outline'} className="w-fit">
                                        <PlusIcon className="size-4" />
                                        Create Project
                                    </Button>

                                </Link>

                            </SidebarMenuItem>
                            )}

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>
        </Sidebar>
    )
}

