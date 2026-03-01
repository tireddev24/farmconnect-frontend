import { Wheat, Search, Flame, CircleDot } from "lucide-react";

import { FilterPill } from "./filterpill";
import { Avatar, Box, Button, HStack, Input, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiGalleryView2 as Gallery } from "react-icons/ri";
import type { User } from "../types/userType";

interface HeaderProps {
  title: string;
  subtitle: string;
  searchQuery?: string;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>> | null;
  user?: User;
  filter?: string;
  setFilter?: React.Dispatch<React.SetStateAction<string>>;
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

  const location = useLocation();

  const path = location.pathname;

  return (
    <Box
      top={0}
      position={"sticky"}
      minH={36}
      bg={{ base: "white", _dark: "#1a1a1a/80" }}
      // className=" bg-[#1a1a1a]/80 backdrop-blur-xl border-b border-[#252525]"
    >
      <Box px={4} py={4} className="px-4 lg:px-8 py-4">
        <Box className="flex items-center justify-between gap-4">
          <div>
            {/* <h1 className="text-green-500/40 dark:text-[#c9a962]  font-bold tracking-tight hidden lg:block"> */}
            <Text
              fontSize={"xl"}
              fontWeight={"bold"}
              textTransform={"uppercase"}
              color={{ base: "green", _dark: "yellow.500" }}
            >
              {title}
            </Text>
            {/* </h1> */}
            <p className=" text-gray-500">
              <Text fontSize={"md"}>{subtitle}</Text>
            </p>
          </div>

          {/* Search Bar */}
          {path.includes("dashboard") && (
            <Box className="flex-1 max-w-2xl relative">
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-5  h-5 text-gray-500" />
              <Input
                border={"1px solid "}
                type="text"
                placeholder="Search for grains, tubers..."
                className="w-full bg-[#252525] border border-[#333] h-8 left-2 rounded-xl text-sm focus:outline-none focus:border-[#c9a962]/50 transition-all"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery && setSearchQuery(e.target.value)
                }
              />
            </Box>
          )}

          {path.includes("market") && (
            <Box className="flex-1 max-w-2xl relative">
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-5  h-5 text-gray-500" />
              <Input
                border={"1px solid "}
                type="text"
                placeholder="Search for products, categories..."
                className="w-full bg-[#252525] border border-[#333] h-8 left-2 rounded-xl text-sm focus:outline-none focus:border-[#c9a962]/50 transition-all"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery && setSearchQuery(e.target.value)
                }
              />
            </Box>
          )}

          {/* Auth Display */}
          <div className="flex items-center gap-3">
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
          </div>
        </Box>

        {/* Filter Pills */}
        {path.includes("dashboard") && (
          <div className="flex items-center  gap-2 mt-4 overflow-x-auto pb-2">
            <FilterPill
              label="Trending"
              icon={<Flame size={16} />}
              active={filter === "all"}
              onClick={() => setFilter && setFilter("all")}
            />
            <FilterPill
              label="Grains"
              icon={<Wheat size={16} />}
              active={filter === "grains"}
              onClick={() => setFilter && setFilter("grains")}
            />
            <FilterPill
              label="Tubers"
              icon={<CircleDot size={16} />}
              active={filter === "tubers"}
              onClick={() => setFilter && setFilter("tubers")}
            />
          </div>
        )}

        {path.includes("market") && (
          <div className="flex items-center  gap-2 mt-4 overflow-x-auto pb-2">
            <FilterPill
              label="All Trends"
              icon={<Gallery size={16} />}
              active={filter === "all"}
              onClick={() => setFilter && setFilter("all")}
            />
            <FilterPill
              label="Trending"
              icon={<Flame size={16} />}
              active={filter === "all"}
              onClick={() => setFilter && setFilter("all")}
            />
            <FilterPill
              label="Grains"
              icon={<Wheat size={16} />}
              active={filter === "grains"}
              onClick={() => setFilter && setFilter("grains")}
            />
            <FilterPill
              label="Tubers"
              icon={<CircleDot size={16} />}
              active={filter === "tubers"}
              onClick={() => setFilter && setFilter("tubers")}
            />
          </div>
        )}
      </Box>
    </Box>
  );
};
