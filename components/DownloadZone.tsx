import { Box, Text, Button, Spinner } from "@chakra-ui/react";

const DownloadZone = () => {
  return (
    <Box bg="gray.400">
      <Text>DownloadZone</Text>
      <Button colorScheme="blue">
        <Spinner />
      </Button>
    </Box>
  );
};

export default DownloadZone;
