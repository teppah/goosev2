import {
  Box,
  Text,
  VStack,
  Heading,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { formatState, pageState as pState } from "data/atoms";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const validator = /[^0-9 ]/g;

const FormatPreview = () => {
  const [format, setFormat] = useRecoilState(formatState);
  const [pageState, setPageState] = useRecoilState(pState);
  useEffect(() => {
    if (
      // need both because of js regex weirdness
      validator.test(format.formatString) ||
      validator.exec(format.formatString) !== null
    ) {
      setFormat((oldFormat) => {
        return { ...oldFormat, isInvalidated: true };
      });
    } else {
      setFormat((oldFormat) => {
        return { ...oldFormat, isInvalidated: false };
      });
      const pageArray: number[] = format.formatString
        .split(" ")
        .filter((str) => str.length !== 0)
        .map((val) => parseInt(val));
      console.log(pageArray);
      setPageState((oldState) => {
        return { ...oldState, pages: pageArray };
      });
    }
  }, [format.formatString]);
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
        Format Preview
      </Heading>
      {pageState.pages.length === 0 ? (
        <Text>Enter your format above!</Text>
      ) : (
        <UnorderedList>
          {pageState.pages.map((nPages, i, arr) => {
            const start = arr
              .slice(0, i)
              .reduce((prev, next) => prev + next, 1);
            return (
              <ListItem key={i}>
                Question {i + 1}, containing {nPages} page(s) ({start} to{" "}
                {start + nPages - 1})
              </ListItem>
            );
          })}
        </UnorderedList>
      )}
    </VStack>
  );
};

export default FormatPreview;
