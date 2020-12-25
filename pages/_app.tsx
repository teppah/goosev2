import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

const Goose = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ChakraProvider>
  );
};

export default Goose;
