import {
  Button,
  CloseButton,
  Dialog,
  For,
  HStack,
  Portal,
  type ConditionalValue,
} from "@chakra-ui/react";

const DialogComp = ({
  placement,
  title,
  text,
  action,
}: {
  placement?: ConditionalValue<"bottom" | "top" | "center" | undefined>;
  text: string;
  action: () => void;
}) => {
  return (
    <HStack wrap="wrap" gap="4">
      <Dialog.Root placement={placement} motionPreset="slide-in-bottom">
        <Dialog.Trigger asChild>
          <Button variant="outline">{title} </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>title</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <p>{text}</p>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button>Save</Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </HStack>
  );
};

export default DialogComp;
