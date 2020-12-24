import { Box, Text, Heading, Button, VStack, useToast } from "@chakra-ui/react";
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
      if (files.length === 0 && rejections.length !== 0) {
        toast({
          title: "Failed to add PDF",
          description: "Make sure you select only one PDF file.",
          status: "error",
          duration: 7000,
          isClosable: true,
        });
      } else {
        setFile(files[0]);
        toast({
          title: "Added PDF",
          description: `Added PDF file "${files[0].name}".`,
          status: "success",
          duration: 7000,
          isClosable: true,
        });
      }
    },
  });
  console.log(file);
  return (
    <Box
      bg="gray.100"
      minH="8rem"
      d="flex"
      flexDir="column"
      alignItems="center"
      borderRadius="md"
      p="0.8rem"
    >
      <Heading as="h2" size="md">
        PDFDropzone
      </Heading>
      <VStack
        bg={isDragActive ? "green.300" : "green.200"}
        transition="background 0.2s"
        {...getRootProps()}
        flex="1"
        alignSelf="stretch"
        p="0.7rem"
        borderRadius="md"
      >
        {file ? (
          <Text fontFamily="monospace">{file.name}</Text>
        ) : (
          <Text>Drag your PDF here</Text>
        )}
        <input {...getInputProps()} />
        <Button colorScheme="red" onClick={open} size="sm">
          Open file
        </Button>
      </VStack>
    </Box>
  );
};

export default PDFDropzone;
