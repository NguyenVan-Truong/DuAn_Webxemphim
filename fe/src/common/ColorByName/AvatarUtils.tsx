import { Flex, Text } from "@mantine/core";
import Avvvatars from "avvvatars-react";
import React from "react";

export const AvatarUtils = ({
  value,
  show = true,
}: {
  value: string;
  show?: boolean;
}) => {
  const cleanValue = value ? value.toString().replace(/[^a-zA-Z\s]/g, "") : "";
  const words = cleanValue.split(" ").filter(Boolean);
  const word2 = cleanValue.split("-").filter(Boolean);
  let displayValue = "";

  if (words.length > 0 && value.indexOf("-") < 0)
    displayValue =
      words[0].substring(0, 1) +
      (words.length > 1
        ? words[words.length - 1].substring(0, 1)
        : word2[0]?.substring(1, 2));
  else
    displayValue =
      word2[0]?.substring(0, 1) +
      (word2.length > 1
        ? word2[word2.length - 1].substring(0, 1)
        : word2[0]?.substring(1, 2));
  return (
    <Flex gap={15} align={"center"}>
      {cleanValue ? (
        <Avvvatars
          size={38}
          style="character"
          displayValue={displayValue}
          value={cleanValue}
        />
      ) : null}
      {show && <Text fw={600}>{value}</Text>}
    </Flex>
  );
};
