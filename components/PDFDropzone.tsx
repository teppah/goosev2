import {
  Box,
  Text,
  Heading,
  Button,
  VStack,
  useToast,
  HStack,
  Link,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { fileState } from "data/atoms";
import { useDropzone } from "react-dropzone";
import { useRecoilState } from "recoil";

const PDFDropzone = () => {
  const toast = useToast();
  const [file, setFile] = useRecoilState(fileState);
  const {
    getRootProps,
    getInputProps,
    open,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    accept: "application/pdf",
    onDrop: (files, rejections, e) => {
      e.preventDefault();
      if (files.length === 0 && rejections.length !== 0) {
        toast({
          title: "Failed to add PDF",
          description: "Make sure you select only one PDF file.",
          status: "error",
          isClosable: true,
        });
      } else {
        setFile(files[0]);
        toast({
          title: "Added PDF",
          description: `Added PDF file "${files[0].name}".`,
          status: "success",
          isClosable: true,
        });
      }
    },
  });
  return (
    <Box
      border="1px"
      borderColor="gray.300"
      minH="8rem"
      d="flex"
      flexDir="column"
      alignItems="center"
      borderRadius="md"
      p="0.8rem"
    >
      <Heading as="h2" size="lg">
        Select your file
      </Heading>
      <VStack
        border="2px"
        borderColor={isDragActive ? "green.500" : "gray.400"}
        borderStyle="dashed"
        transition="box-shadow 0.2s"
        flex="1"
        alignSelf="stretch"
        p="0.7rem"
        borderRadius="md"
        {...getRootProps()}
      >
        {file ? (
          <Text fontFamily="monospace" fontSize="md">
            <CheckCircleIcon color="teal.500" mr="0.2rem" />
            {file.name}
          </Text>
        ) : (
          <Text>Drag your PDF here</Text>
        )}
        <input {...getInputProps()} />
        <Button colorScheme="blue" onClick={open} size="sm">
          Open file
        </Button>
      </VStack>
      <HStack mt="0.5rem">
        <WarningIcon color="yellow.500" />
        <Text fontSize="sm">
          No data{" "}
          <strong>
            <em>ever</em>
          </strong>{" "}
          leaves your browser.{" "}
          <Link
            isExternal
            href="https://github.com/teppah/goosev2/blob/main/util/process-pdf.ts"
            color="teal.500"
          >
            See how your PDF is processed right in your browser.
          </Link>
        </Text>
      </HStack>
    </Box>
  );
};

export default PDFDropzone;
