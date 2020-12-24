import { Box, Text, Heading, Button, VStack } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

const PDFDropzone = () => {
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    accept: "application/pdf",
    onDrop: (files, rejections, e) => {
      console.log(files);
      console.log(files[0].size);
      console.log(rejections);
    },
  });
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
        bg="green.200"
        {...getRootProps()}
        flex="1"
        alignSelf="stretch"
        p="0.7rem"
        borderRadius="md"
      >
        <Text>Drag your PDF file here</Text>
        <input {...getInputProps()} />
        <Button colorScheme="red" onClick={open} size="sm">
          Open file
        </Button>
      </VStack>
    </Box>
  );
};

export default PDFDropzone;
