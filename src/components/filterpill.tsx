import { Button } from "@chakra-ui/react";

export const FilterPill = ({ label, icon, active, onClick }: any) => (
  <Button
    onClick={onClick}
    bg={{
      base: active ? "green.600/80" : "gray.100",
      _dark: active ? "#8a7557" : "#252525",
    }}
    color={{
      base: active ? "" : "gray.500",
      _dark: active ? "" : "gray.400",
    }}
    _hover={{
      bg: {
        base: active ? " " : "",
        _dark: active ? "" : "#333",
      },
    }}
    gradientTo={{ base: "green.600/80", _dark: "#8a7557" }}
    marginTop={4}
    rounded={"3xl"}
    className={`flex items-center gap-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
    ${active ? "bg-linear-to-r from-[#a38d6d] to-[#8a7557] text-black" : "bg-[#252525] text-gray-400 hover:bg-[#333]"}`}
  >
    {icon} {label}
  </Button>
);
