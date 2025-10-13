'use client';

import { useUniversal } from '@/lib/universal';

// Re-export the hook with performance support
export const useUniversalDevice = useUniversal;

// Re-export types for backward compatibility
export type { DeviceType } from '@/lib/universal';
export type { UniversalConfig } from '@/lib/universal';