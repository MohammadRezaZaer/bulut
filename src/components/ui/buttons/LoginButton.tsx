// components/LoginButton.tsx
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import {cn} from "@/lib/utils"; // You can use any icon

interface LoginButtonProps {
  href: string;
  text: string;
    className: string;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ className,href, text }) => {
  return (
    <div className={cn("hidden   flex-row items-center justify-between lg:flex lg:gap-5",className)}>
      <a
        href={href}
        className="flex h-9 min-w-[154px] items-center justify-center gap-2 rounded-full bg-primary px-4 py-[10px] font-medium leading-normal text-white md:h-[42px] md:w-[154px] dark:text-darkText-500 dark:hover:bg-darkBtn-200"
      >
        <p className="mb-[2px] align-middle text-black md:text-[15px] ">{text}</p>
        <span className="flex items-center">
          <ArrowRightIcon className="h-6 w-6 text-black" />
        </span>
      </a>
    </div>
  );
};
