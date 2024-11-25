"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { getSiteConfig } from "@/lib/get-config-value";

interface CategoryItem {
  name: string;
  path: string;
}

interface StickyHeaderProps {
  categoryList: CategoryItem[];
}

const StickyHeader = ({ categoryList }: StickyHeaderProps) => {
  const name = getSiteConfig('name');
  const currentPath = decodeURIComponent(usePathname());
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [hasShadow, setHasShadow] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHidden(currentScrollY > lastScrollY && currentScrollY > 50);
      setHasShadow(currentScrollY > 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, currentPath]);

  useEffect(() => {
    const activeTab =
      categoryList.find((item) => currentPath.startsWith(item.path)) || categoryList[0];
    setCurrentTab(activeTab.path);
  }, [currentPath, categoryList]);

  if (!getSiteConfig('showHomeTab') && currentPath === "/") return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full transition-all duration-300 z-50 bg-white hidden md:block",
        isHidden ? "-translate-y-full" : "translate-y-0",
        hasShadow && !isHidden ? "shadow-md" : ""
      )}
    >
      <div className="flex flex-row justify-between items-center max-w-screen-md mx-auto py-2">
        <Link href="/" className="text-lg font-bold">
          {name}
        </Link>
        <NavigationMenu className="">
          <NavigationMenuList>
            {categoryList.map(({ name, path }) => (
              <NavigationMenuItem
                key={name}
                className={currentTab === path ? "underline underline-offset-8 font-semibold" : ""}
              >
                <Link href={path} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default StickyHeader;
