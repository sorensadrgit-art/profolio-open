// @ts-ignore
import FolderComponent from './Folder.jsx';
// @ts-ignore
import MagicBentoComponent from './MagicBento.jsx';
import type { ComponentType } from 'react';
import type { FolderProps, MagicBentoProps } from './reactBits';

export const Folder = FolderComponent as ComponentType<FolderProps>;
export const MagicBento = MagicBentoComponent as ComponentType<MagicBentoProps>;
export type { FolderProps, FolderItem, MagicBentoProps, BentoItem } from './reactBits';
