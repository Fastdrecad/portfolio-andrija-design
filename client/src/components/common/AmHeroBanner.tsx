import { SVGProps } from "react";

interface AmHeroProps extends SVGProps<SVGSVGElement> {
  color?: string;
  stroke?: string;
  fill?: string;
}

export const AmHeroBanner = ({
  color = "green",
  stroke = "currentColor",
  fill = "currentColor",
  ...props
}: AmHeroProps) => (
  <svg
    className="am-hero-banner"
    color={color}
    {...props}
    viewBox="0 0 120 86"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <path
      fill={fill}
      stroke={stroke}
      d="M89.4 19.1L107.6 73.7C110.5 82.3 113.6 83.6 119.5 83.6V86H84.1V83.7C90.1 83.7 97.6 85 94.8 74.3L76.7 21L56.2 86H54.3L45.8 59.6H20.2C18.3 65.5 15.5 72.4 18.1 78.7C19.9 83 21.7 83.5 24.9 83.7V86H0V83.7C3.5 83.2 5.2 82.3 7.9 79.4C11 76 14 69.8 17 60.7L31.7 14.3C29.6 7.4 27.5 2.3 21.2 2.3H18.9V0H39.3L60.6 63.1L80.5 0H99.8V2.3H97.5C88 2.3 85.1 8.8 89.4 19.1ZM21.4 56H44.6L32.9 18.7L21.4 56Z"
    />
  </svg>
);
