import Head from "next/head";
import { VStack, Text, Heading, useColorMode, Button } from "@chakra-ui/react";
import PDFDropzone from "components/PDFDropzone";
import FormatInput from "components/FormatInput";
import FormatPreview from "components/FormatPreview";
import DownloadZone from "components/DownloadZone";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <VStack
      spacing="0.5rem"
      align={{ base: "stretch", md: "center" }}
      px="2rem"
    >
      <VStack spacing="0rem" marginTop="2rem">
        <Heading as="h1">GooseSplitter</Heading>
        <Text textAlign="center">
          Conveniently split your PDFs for Crowdmark Submission
        </Text>
      </VStack>
      <Button onClick={toggleColorMode}>Toggle dark mode</Button>

      <PDFDropzone />
      <FormatInput />
      <FormatPreview />
      <DownloadZone />
    </VStack>
  );
}
