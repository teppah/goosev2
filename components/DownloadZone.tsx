import {
  Box,
  Text,
  Button,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import {
  fileState as fileState,
  formatState,
  isShowInvalid,
  pageState as pState,
} from "data/atoms";
import { getZipFile } from "util/process-pdf";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MouseEvent, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { downloadUint8ToFile, getPageStartNumber } from "util/utils";

const DownloadWidget = () => {
  const isInvalidated = useRecoilValue(isShowInvalid);
  const setFormat = useSetRecoilState(formatState);
  const pageState = useRecoilValue(pState);
  const file = useRecoilValue(fileState);
  const toast = useToast();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (isInvalidated) {
      toast({
        title: "Invalid format",
        description:
          "The format can only contain numbers, separated by spaces.",
        status: "error",
        isClosable: true,
      });
      return;
    } else if (!file) {
      toast({
        title: "No file added",
        description: "Please select a PDF file.",
        status: "error",
        isClosable: true,
      });
      return;
    }
    try {
      setIsProcessing(true);
      const buffer = await file.arrayBuffer();
      const uploaded = await PDFDocument.load(buffer, {
        ignoreEncryption: true,
      });
      const expectedTotalCount = pageState.pages.reduce((a, b) => a + b, 0);
      const actualPageCount = uploaded.getPageCount();
      if (expectedTotalCount !== actualPageCount) {
        toast({
          title: "Wrong page count",
          description: `The format you entered has ${expectedTotalCount} pages, which doesn't match your PDF's page count (${actualPageCount}).`,
          status: "error",
          isClosable: true,
        });
        setFormat((oldFormat) => {
          return { ...oldFormat, isInvalidated: true };
        });
      } else {
        const zip = await getZipFile(
          uploaded,
          pageState.pages,
          pageState.outputFileFormat
        );
        const zipBytes = await zip.generateAsync({
          type: "uint8array",
          compression: "DEFLATE",
          compressionOptions: {
            level: 3,
          },
        });
        downloadUint8ToFile(zipBytes, "questions.zip", "application/zip");
        toast({
          title: "Finished processing!",
          description: "The download for your files has started.",
          status: "success",
          isClosable: true,
        });
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "Unexpected error",
        description: `${e}`,
        status: "error",
        isClosable: true,
      });
    }
    setIsProcessing(false);
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
      <Heading as="h2" size="lg" textAlign="center">
        Get your file
      </Heading>
      <Button colorScheme="blue" onClick={handleProcess} isLoading={isProcessing}>
        Download
      </Button>
    </VStack>
  );
};

export default DownloadWidget;
