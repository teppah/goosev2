import { Box, Text, Heading, VStack, Input, HStack } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { formatState, isShowInvalid } from "data/atoms";
import { ChangeEvent, useState } from "react";

const FormatInput = () => {
  const isInvalidated = useRecoilValue(isShowInvalid);
  const setFormat = useSetRecoilState(formatState);
  const [text, setText] = useState("");

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
    setFormat((oldFormat) => {
      return { ...oldFormat, formatString: e.target.value };
    });
  };

  return (
    <VStack
      bg="gray.100"
      d="flex"
      flexDir="column"
      alignItems="center"
      borderRadius="md"
      p="0.8rem"
    >
      <Heading as="h2" size="md" textAlign="center">
        Enter your desired output format
      </Heading>
      <Input
        placeholder="# # # #"
        bg="white"
        borderColor="gray.300"
        isInvalid={isInvalidated}
        value={text}
        onChange={handleUpdate}
      />
      <HStack>
        <InfoOutlineIcon color="green.600" />
        <Text fontSize="xs">
          Space-separated numbers corresponding for the number of pages for each
          question, in order
        </Text>
      </HStack>
    </VStack>
  );
};

export default FormatInput;
