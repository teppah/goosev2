import Head from "next/head";
import {
  VStack,
  Text,
  Heading,
  useColorMode,
  Button,
  Switch,
  useMediaQuery,
  Center,
  Box,
  Link,
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
    <Center>
      <VStack
        spacing="0.5rem"
        align="stretch"
        px="2rem"
        width="100%"
        maxW="1000px"
        height="100vh"
      >
        <VStack spacing="0rem" my="2rem">
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
        <Text textAlign="center" marginTop="auto">
          Made with ❤️ by{" "}
          <Link isExternal href="https://github.com/teppah" color="teal.500">
            teppah
          </Link>
        </Text>
      </VStack>
    </Center>
  );
}
