// components/DashboardCard.tsx
import { FC } from 'react';
import Link from 'next/link';
import {ArrowLeft, ArrowRight, LucideIcon} from 'lucide-react';

interface DashboardCardProps {
  href: string;
  title: string;
  Icon: LucideIcon; // Icon from Lucide
}

const DashboardCard: FC<DashboardCardProps> = ({ href, title, Icon }) => {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl border px-3 py-5 shadow-lg transition hover:shadow-xl md:px-6 xl:px-4 xl:py-6"
    >
      <section className="flex items-center">
        <Icon className="ml-3 size-[56px] xl:size-[65px] text-primary" />
        <span className="text-[16px] font-semibold xl:text-[18px] xl:font-bold">
          {title}
        </span>
      </section>

      <ArrowLeft className="size-[24px] text-muted-foreground" />
    </Link>
  );
};

export default DashboardCard;
