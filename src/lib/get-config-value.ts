import { SiteConfig } from '@/types/site-config'
import siteConfig from '../../site.config'

export function getSiteConfig<T extends keyof SiteConfig>(
  key: T,
  defaultValue?: SiteConfig[T]
): SiteConfig[T] {
  const value = siteConfig[key];

  if (value !== undefined) {
    return value;
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new Error(`Config error: missing required site config value "${key}"`);
}
