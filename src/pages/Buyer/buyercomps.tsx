import {
  Dialog,
  Button,
  Portal,
  CloseButton,
  Box,
  VStack,
  Text,
} from "@chakra-ui/react";

const Payment = () => {
  return (
    <Dialog.Root role="alertdialog">
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          _hover={{ bg: "green.300" }}
        ></Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Make Payments</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Box>
                <VStack>
                  <Text>Account Number: 9583975025</Text>
                </VStack>
              </Box>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red">Accept Order</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default Payment;
