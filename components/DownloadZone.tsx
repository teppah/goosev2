import {
  Box,
  Text,
  Button,
  Spinner,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { fileState as fState, isShowInvalid } from "data/atoms";
import { useRecoilValue } from "recoil";
import { MouseEvent } from "react";

const DownloadWidget = () => {
  const isInvalid = useRecoilValue(isShowInvalid);
  const file = useRecoilValue(fState);
  const toast = useToast();
  const handleProcess = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (isInvalid) {
      toast({
        title: "Invalid format",
        description:
          "The format can only contain numbers, separated by spaces.",
        status: "error",
        isClosable: true,
      });
      return;
    }
    if (!file) {
      toast({
        title: "No file added",
        description: "Please select a PDF file.",
        status: "error",
        isClosable: true,
      });
      return;
    }
    const stream = await file.arrayBuffer();
    const bytes = new Uint8Array(stream);

    toast({
      title: "Finished processing!",
      description: "The download for your files has started.",
      status: "success",
      isClosable: true,
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
        Get your file
      </Heading>
      <Button onClick={handleProcess}>Process</Button>
    </VStack>
  );
};

export default DownloadWidget;
