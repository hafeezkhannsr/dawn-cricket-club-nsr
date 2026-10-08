type IconProps = { size?: number; className?: string };
const base = (size: number) => ({
  width: size, height: size, viewBox: "0 0 24 24",
  fill: "none", stroke: "currentColor",
  strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
  "aria-hidden": true,
});
export const UserIcon = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
export const AdminIcon = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z"/><path d="m9 12 2 2 4-4"/></svg>
);
export const UserPlusIcon = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
);
export const DocumentIcon = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>
);
export const MapPinIcon = ({ size = 16 }: IconProps) => (
  <svg {...base(size)}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
export const ShieldCheckIcon = ({ size = 20 }: IconProps) => (
  <svg {...base(size)}><path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z"/><path d="m9 12 2 2 4-4"/></svg>
);
export const UsersGroupIcon = ({ size = 20 }: IconProps) => (
  <svg {...base(size)}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
export const IdCardIcon = ({ size = 20 }: IconProps) => (
  <svg {...base(size)}><rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="9" cy="11" r="3"/><path d="M15 9h5"/><path d="M15 13h5"/><path d="M15 17h3"/></svg>
);
export const TrendingIcon = ({ size = 20 }: IconProps) => (
  <svg {...base(size)}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
export const TrophyIcon = ({ size = 20 }: IconProps) => (
  <svg {...base(size)}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>
);
export const MenuIcon = ({ size = 20 }: IconProps) => (
  <svg {...base(size)}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
);
export const CloseIcon = ({ size = 20 }: IconProps) => (
  <svg {...base(size)}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);
export const ArrowRightIcon = ({ size = 18 }: IconProps) => (
  <svg {...base(size)}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);