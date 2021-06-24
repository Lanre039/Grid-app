import { Container, Flex, Box, Spacer, Text, Link } from "@chakra-ui/react";

import "./navbar.scss";

function Navbar() {
  return (
    <nav className="nav">
      {/* <Box bg="white">
        <Container maxW="container.lg">
          <Flex>
            <Box p="4" pl="0" cursor="pointer">
              <Text fontSize="4xl" fontWeight="semibold">
                <Link >SHAPES</Link>
              </Text>
            </Box>
            <Spacer />
            <Box p="4" pl="0" cursor="pointer">
              <Text fontSize="4xl" color="red.300" fontWeight="normal">
                Logout
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box> */}
      <div className="nav_content container">
        <h1>SHAPES</h1>
        <h1 className="nav_text-right">Logout</h1>
      </div>
    </nav>
  );
}

export default Navbar;
