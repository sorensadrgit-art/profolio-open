import type { ComponentType, CSSProperties, MouseEvent, ReactNode } from 'react';

export interface FolderItem {
  title?: string;
  description?: string;
  image?: string;
  alt?: string;
  content?: ReactNode;
  [key: string]: any;
}

export interface FolderProps {
  items?: FolderItem[];
  label?: string;
  mode?: 'flap' | 'book';
  variant?: 'solid' | 'glass' | 'matte';
  color?: string;
  paperColor?: string;
  tabPosition?: 'left' | 'center' | 'right';
  layout?: 'spread' | 'stack' | 'row';
  size?: number;
  openOn?: 'click' | 'hover';
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onItemClick?: (item: FolderItem, index: number) => void;
  onItemDrop?: (item: FolderItem, index: number, inside: boolean) => void;
  draggable?: boolean;
  zoomOnClick?: boolean;
  peek?: boolean;
  intro?: boolean;
  tilt?: number;
  bounce?: number;
  speed?: number;
  frost?: number;
  closeOnOutsideClick?: boolean;
  theme?: 'dark' | 'light';
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export declare const Folder: ComponentType<FolderProps>;
export default Folder;

export interface BentoItem {
  id?: string | number;
  title?: string;
  description?: string;
  label?: string;
  icon?: ReactNode;
  visual?: string | ReactNode;
  content?: ReactNode;
  image?: string;
  colSpan?: number;
  rowSpan?: number;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  [key: string]: any;
}

export interface MagicBentoProps {
  items?: BentoItem[];
  columns?: number;
  rowHeight?: number;
  gap?: number;
  radius?: number;
  theme?: 'dark' | 'light';
  glowColor?: string;
  textAutoHide?: boolean;
  enableBorderGlow?: boolean;
  enableSpotlight?: boolean;
  spotlightRadius?: number;
  enableStars?: boolean;
  particleCount?: number;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  intro?: boolean;
  disableAnimations?: boolean;
  onItemClick?: (entry: BentoItem, index: number) => void;
  className?: string;
  style?: CSSProperties;
}

export declare const MagicBento: ComponentType<MagicBentoProps>;
