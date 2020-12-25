import {
  Box,
  Text,
  Heading,
  VStack,
  Input,
  HStack,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  InfoOutlineIcon,
  NotAllowedIcon,
  MinusIcon,
} from "@chakra-ui/icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
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
      return { ...oldFormat, formatString: e.target.value.trim() };
    });
  };

  return (
    <VStack
      border="1px"
      borderColor="gray.300"
      d="flex"
      flexDir="column"
      alignItems="center"
      borderRadius="md"
      p="0.8rem"
    >
      <Heading as="h2" size="md" textAlign="center">
        Enter your desired output format
      </Heading>
      <InputGroup>
        <InputLeftAddon
          children={
            text.length === 0 ? (
              <MinusIcon color="gray.400" />
            ) : isInvalidated ? (
              <NotAllowedIcon color="red.500" />
            ) : (
              <CheckCircleIcon color="green.500" />
            )
          }
        />
        <Input
          placeholder="# # # #"
          isInvalid={isInvalidated && text.length > 0}
          value={text}
          onChange={handleUpdate}
        />
      </InputGroup>
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
