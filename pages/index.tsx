import Head from "next/head";
import {
  VStack,
  Text,
  Heading,
  useColorMode,
  Button,
  Switch,
  useMediaQuery,
} from "@chakra-ui/react";
import PDFDropzone from "components/PDFDropzone";
import FormatInput from "components/FormatInput";
import FormatPreview from "components/FormatPreview";
import DownloadWidget from "components/DownloadZone";
import { useEffect } from "react";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [prefersDark] = useMediaQuery("(prefers-color-scheme: dark");
  useEffect(() => {
    if (prefersDark) {
      if (colorMode !== "dark") {
        toggleColorMode();
      }
    } else {
      if (colorMode !== "light") {
        toggleColorMode();
      }
    }
  }, [prefersDark]);
  return (
    <VStack
      spacing="0.5rem"
      align={{ base: "stretch", md: "center" }}
      px="2rem"
    >
      <VStack spacing="0rem" marginTop="2rem">
        <Heading as="h1">
          GooseSplitter
          <Switch
            ml="0.5rem"
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
          />
        </Heading>
        <Text textAlign="center">
          Conveniently split your PDFs for Crowdmark Submission
        </Text>
      </VStack>

      <PDFDropzone />
      <FormatInput />
      <FormatPreview />
      <DownloadWidget />
    </VStack>
  );
}
