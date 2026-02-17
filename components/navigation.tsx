"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navigation() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.6)", "rgba(255, 255, 255, 0.95)"]
  );

  const borderOpacity = useTransform(
    scrollY,
    [0, 100],
    [0.3, 1]
  );

  return (
    <motion.nav 
      className="sticky top-0 z-50 border-b border-border backdrop-blur-xl"
      style={{ 
        backgroundColor,
        borderColor: useTransform(borderOpacity, (o) => `rgba(0, 0, 0, ${o * 0.1})`)
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <motion.div 
              className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-2 ring-primary/20 overflow-hidden"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <Terminal className="relative h-6 w-6" />
            </motion.div>
            <motion.span 
              className="font-display text-xl font-bold tracking-tight text-foreground"
              initial={{ opacity: 0.9 }}
              whileHover={{ opacity: 1 }}
            >
              Terminal Thoughts
            </motion.span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              
              return (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    className={cn(
                      "relative px-5 py-2.5 text-sm font-semibold rounded-xl transition-colors",
                      isActive 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.label}
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-primary/10 ring-1 ring-primary/20"
                        layoutId="activeNav"
                        transition={{ 
                          type: "spring", 
                          stiffness: 380, 
                          damping: 30 
                        }}
                      />
                    )}
                    
                    {/* Hover background */}
                    {!isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-muted"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{ zIndex: -1 }}
                      />
                    )}
                    
                    <span className="relative">{link.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
