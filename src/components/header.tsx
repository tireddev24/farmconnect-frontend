import { Search } from "lucide-react";

import { FilterPill } from "./filterpill";
import { Avatar, Box, Button, Flex, HStack, Input, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import type { UserProfile } from "@/types/types";
import { categories } from "@/lib/constants";

interface HeaderProps {
  title: string;
  subtitle: string;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  user?: UserProfile;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const Header = ({
  searchQuery,
  setSearchQuery,
  user,
  filter,
  setFilter,
  title,
  subtitle,
}: HeaderProps) => {
  const navigate = useNavigate();


  return (
    <Box
      top={0}
      position={"sticky"}
      minH={36}
      bg={{ base: "white", _dark: "#1a1a1a/80" }}
    // className=" bg-[#1a1a1a]/80 backdrop-blur-xl border-b border-[#252525]"
    >
      <Box px={4} py={4}>
        <Flex gap={8} justifyContent={"space-between"} alignItems={"flex-start"}>
          <Box>
            <Text
              fontSize={"xl"}
              fontWeight={"bold"}
              textTransform={"uppercase"}
              color={{ base: "green", _dark: "yellow.500" }}
            >
              {title}
            </Text>
            <Text fontSize={"md"}>{subtitle}</Text>
          </Box>


          <Box flex={1} pos={"relative"}>
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-5  h-5 text-gray-500" />
            <Input
              border={"1px solid "}
              rounded={"md"}
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery!(e.target.value)
              }
            />
          </Box>


          {/* Auth Display */}
          {user ? (
            <Box className="flex items-center gap-3">
              <Box className="text-right hidden md:block">
                <p className="text-sm font-medium">
                  {user.firstName + " " + user.lastName}
                </p>
                <Text
                  fontWeight={"semibold"}
                  className="text-xs uppercase text-gray-500"
                >
                  {user.role}
                </Text>
              </Box>
              <Avatar.Root
                bg={"#2a2a2a"}
                size="lg"
              // border="4px solid #1a1a1a"
              >
                <Avatar.Fallback
                  name={user.firstName + " " + user.lastName}
                  color="gray.400"
                />
                <Avatar.Image
                  src={`https://ui-avatars.com/api/?name=${user.firstName + " " + user.lastName}&background=a38d6d&color=fff`}
                />
              </Avatar.Root>
            </Box>
          ) : (
            <HStack spaceX={2}>
              <Button
                _hover={{ bg: "whiteAlpha.100" }}
                bg={{ base: "none", _dark: "none" }}
                color={{ base: "black", _dark: "white" }}
                className="  px-5 py-2 rounded-xl font-medium"
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>

              <Button
                bg={{ base: "green.500", _dark: "#8d7b60" }}
                gradientTo={{ base: "green.600/80", _dark: "#8a7557" }}
                _hover={{ bg: { base: "green.600", _dark: "#8d7b60" } }}
                color={{ base: "white", _dark: "black" }}
                className=" px-5 py-2 rounded-xl font-medium"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </HStack>
          )}
        </Flex>

        {/* Filter Pills */}

        <Flex gap={2} overflowX={"auto"} py={2} mt={4}>
          <FilterPill
            label="All"
            // icon={<ShoppingBag size={16} />}
            active={filter === "all"}
            onClick={() => setFilter && setFilter("all")}
          />

          {categories.slice(1).map((cat) => (
            <FilterPill
              key={cat.id}
              label={cat.name.split(" ")[0]}
              // icon={<CircleDot size={16} />}
              active={filter === cat.name.toLowerCase()}
              onClick={() => setFilter && setFilter(cat.name.toLowerCase())}
            />
          ))}
        </Flex>



      </Box>
    </Box>
  );
};
