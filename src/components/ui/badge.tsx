import { Badge as ChakraBadge } from "@chakra-ui/react";

interface BadgeProps {
  text: string;
  color: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const Badge = ({ text, color, size }: BadgeProps) => (
  <ChakraBadge
    bg={color + ".500/10"}
    color={color + ".500"}
    textTransform={"capitalize"}
    rounded="full"
    px={3}
    size={size}
  >
    ● {text}
  </ChakraBadge>
);

export default Badge;
