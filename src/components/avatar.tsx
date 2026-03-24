import { Avatar, type ConditionalValue } from "@chakra-ui/react";

const AvatarCard = ({
  name: text,
  size,
  image,
}: {
  name: string;
  image: string;
  size: ConditionalValue<
    "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "2xs" | "xs" | undefined
  >;
}) => {
  return (
    <Avatar.Root bg={"#2a2a2a"} size={size} border="4px solid #1a1a1a">
      <Avatar.Fallback name={text} color="gray.400" />
      <Avatar.Image src={image} />
    </Avatar.Root>
  );
};

export default AvatarCard;
