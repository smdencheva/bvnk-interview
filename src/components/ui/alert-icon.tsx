import React from "react";

export function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 0C10.7664 0 0 10.7664 0 24C0 37.2336 10.7664 48 24 48C37.2336 48 48 37.2336 48 24C48 10.7664 37.2336 0 24 0ZM21.6 14.4C21.6 13.0745 22.6745 12 24 12C25.3255 12 26.4 13.0745 26.4 14.4V24C26.4 25.3255 25.3255 26.4 24 26.4C22.6745 26.4 21.6 25.3255 21.6 24V14.4ZM24 36C25.3255 36 26.4 34.9255 26.4 33.6C26.4 32.2745 25.3255 31.2 24 31.2C22.6745 31.2 21.6 32.2745 21.6 33.6C21.6 34.9255 22.6745 36 24 36Z"
        fill="#FF785F"
      />
    </svg>
  );
}
