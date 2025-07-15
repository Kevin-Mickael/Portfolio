import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Composant Breadcrumbs SEO-friendly avec balisage Schema.org
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  if (!items || items.length < 2) return null;
  return (
    <nav
      aria-label="Fil d'Ariane"
      className={className}
      itemScope
      itemType="https://schema.org/BreadcrumbList"
      style={{ fontSize: '0.95em', margin: '16px 0', color: 'var(--on-surface-medium)' }}
    >
      {items.map((item, idx) => (
        <span
          key={item.href || item.label}
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          {item.href && idx !== items.length - 1 ? (
            <Link href={item.href} itemProp="item">
              <span itemProp="name">{item.label}</span>
            </Link>
          ) : (
            <span itemProp="name" style={{ fontWeight: 600 }}>{item.label}</span>
          )}
          <meta itemProp="position" content={(idx + 1).toString()} />
          {idx < items.length - 1 && (
            <span aria-hidden="true" style={{ margin: '0 8px', color: 'var(--on-surface-weak)' }}>/</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs; 