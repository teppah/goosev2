import Head from "next/head";
import styles from "../styles/Home.module.css";
import { VStack, Text, Heading } from "@chakra-ui/react";
import PDFDropzone from "components/PDFDropzone";
import FormatInput from "components/FormatInput";
import FormatPreview from "components/FormatPreview";
import DownloadZone from "components/DownloadZone";

export default function Home() {
  return (
    <VStack spacing="0.5rem">
      <VStack spacing="0rem" marginTop="2rem">
        <Heading>GooseSplitter</Heading>
        <Text textAlign="center">
          Conveniently split your PDFs for Crowdmark Submission
        </Text>
      </VStack>

      <PDFDropzone />
      <FormatInput />
      <FormatPreview />
      <DownloadZone />
    </VStack>
  );
}
