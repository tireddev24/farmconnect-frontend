import { Button } from "@chakra-ui/react";

export const FilterPill = ({ label, icon, active, onClick }: any) => (
  <Button
    onClick={onClick}
    bg={{
      base: active ? "gradient-to-r from-[#a38d6d] to-[#8a7557]" : "#252525",
    }}
    marginTop={4}
    rounded={"3xl"}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
    ${active ? "bg-gradient-to-r from-[#a38d6d] to-[#8a7557] text-black" : "bg-[#252525] text-gray-400 hover:bg-[#333]"}`}
  >
    {icon} {label}
  </Button>
);
