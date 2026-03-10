import { Text, HStack, Icon, Circle } from "@chakra-ui/react";

import { type ForwardRefExoticComponent, type RefAttributes } from "react";
import { type LucideProps } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarItem = ({
  icon,
  label,
  link,
  active = false,
  badge,
}: {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
  link: string;
  active?: boolean;
  badge?: string;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  if (path.includes(link)) {
    active = true;
  }
  return (
    <HStack
      px={4}
      py={3}
      bg={active ? "emerald.50" : "transparent"}
      color={active ? "#10a37f" : "gray.600"}
      rounded="xl"
      cursor="pointer"
      _hover={{ bg: "emerald.50", color: "#10a37f" }}
      transition="0.2s"
      onClick={() => navigate(link)}
    >
      <Icon as={icon} fontSize={20} />
      <Text fontWeight="bold" fontSize="sm">
        {label}
      </Text>
      {badge && (
        <Circle size="5" bg="red.500" color="white" fontSize="xs">
          {badge}
        </Circle>
      )}
    </HStack>
  );
};

export default SidebarItem;
