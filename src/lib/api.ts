import { type LinkData } from '@/components/LinkDialog';
import { type CategoryData } from '@/components/CategoryDialog';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

// Links API
export async function fetchLinks(): Promise<LinkData[]> {
  const res = await fetch(`${API_BASE}/links`);
  if (!res.ok) throw new Error('Failed to fetch links');
  const data = await res.json();
  // Map snake_case to camelCase for icon_name
  return data.map((link: any) => ({
    ...link,
    iconName: link.icon_name || link.iconName,
  }));
}

export async function createLink(link: LinkData): Promise<LinkData> {
  const res = await fetch(`${API_BASE}/links`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...link,
      icon_name: link.iconName,
    }),
  });
  if (!res.ok) throw new Error('Failed to create link');
  const data = await res.json();
  return { ...data, iconName: data.icon_name || data.iconName };
}

export async function updateLinkApi(link: LinkData): Promise<LinkData> {
  const res = await fetch(`${API_BASE}/links/${link.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: link.title,
      url: link.url,
      description: link.description,
      color: link.color,
      category: link.category,
      icon_name: link.iconName,
    }),
  });
  if (!res.ok) throw new Error('Failed to update link');
  const data = await res.json();
  return { ...data, iconName: data.icon_name || data.iconName };
}

export async function deleteLinkApi(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/links/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete link');
}

// Categories API
export async function fetchCategories(): Promise<CategoryData[]> {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  const data = await res.json();
  return data.map((cat: any) => ({
    ...cat,
    iconName: cat.icon_name || cat.iconName,
  }));
}

export async function createCategory(category: CategoryData): Promise<CategoryData> {
  const res = await fetch(`${API_BASE}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...category,
      icon_name: category.iconName,
    }),
  });
  if (!res.ok) throw new Error('Failed to create category');
  const data = await res.json();
  return { ...data, iconName: data.icon_name || data.iconName };
}

export async function updateCategoryApi(category: CategoryData): Promise<CategoryData> {
  const res = await fetch(`${API_BASE}/categories/${category.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      label: category.label,
      icon_name: category.iconName,
    }),
  });
  if (!res.ok) throw new Error('Failed to update category');
  const data = await res.json();
  return { ...data, iconName: data.icon_name || data.iconName };
}

export async function deleteCategoryApi(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/categories/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete category');
}

// Settings API
export async function fetchSetting(key: string): Promise<string | null> {
  const res = await fetch(`${API_BASE}/settings/${key}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.value;
}

export async function setSetting(key: string, value: string): Promise<void> {
  const res = await fetch(`${API_BASE}/settings/${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value }),
  });
  if (!res.ok) throw new Error('Failed to save setting');
}

// Health check
export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return res.ok;
  } catch {
    return false;
  }
}
