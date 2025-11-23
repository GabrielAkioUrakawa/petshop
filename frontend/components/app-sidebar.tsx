"use client"

import * as React from "react"
import {
  

  IconBuildingFactory2,
  IconBuildingStore,
  IconCash,
  IconDashboard,

  IconHeart,

  IconHome,

  IconNurse,

  IconPaw,
  IconShoppingCart,
  IconUsers,
} from "@tabler/icons-react"

import { NavProdutos } from "@/components/nav-produtos"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

const data = {
  user: {
    name: "Admin",
    email: "admin@uspets.com.br",
    avatar: "/avatars/logo.png",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: IconHome,
    },
    {
      title: "Profissionais",
      url: "/profissionais",
      icon: IconNurse,
    },
    {
      title: "Clientes",
      url: "/clientes",
      icon: IconUsers,
    },
    {
      title: "Animais",
      url: "/animais",
      icon: IconPaw,
    },
    {
      title: "Produtos",
      url: "/produtos",
      icon: IconBuildingStore,
    },
    {
      title: "Fornecedores",
      url: "/fornecedores",
      icon: IconBuildingFactory2,
    },
    {
      title: "Compras de Produtos",
      url: "/compras",
      icon: IconShoppingCart,
    },
    {
      title: "Serviços",
      url: "/servicos",
      icon: IconHeart,
    },
    {
      title: "Vendas",
      url: "/vendas",
      icon: IconCash,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Logo da empresa"
                  width={35}      
                  height={35}
                />
                <span className="text-base font-semibold">USPets</span>
            </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
