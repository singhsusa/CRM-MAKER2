'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const mainNavItems = [
  {
    title: 'Products',
    href: '/products',
    icon: 'Package'
  },
  {
    title: 'Customers',
    href: '/customers',
    icon: 'Users'
  },
  {
    title: 'Orders',
    href: '/orders',
    icon: 'ShoppingCart'
  }
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col space-y-1">
      {mainNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center px-4 py-2 text-sm font-medium rounded-md",
            pathname === item.href
              ? "bg-gray-100 text-gray-900"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
} 