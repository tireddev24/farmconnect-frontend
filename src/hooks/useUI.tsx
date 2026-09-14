import { useTheme } from "next-themes";
import type { ColorMode, UseColorModeReturn } from "@/components/ui/color-mode";
import { createToaster } from "@chakra-ui/react";

export function useColorMode(): UseColorModeReturn {
    const { resolvedTheme, setTheme, forcedTheme } = useTheme();
    const colorMode = forcedTheme || resolvedTheme;
    const toggleColorMode = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };
    return {
        colorMode: colorMode as ColorMode,
        setColorMode: setTheme,
        toggleColorMode,
    };
}

export function useColorModeValue<T>(light: T, dark: T) {
    const { colorMode } = useColorMode();
    return colorMode === "dark" ? dark : light;
}

export const toaster = createToaster({
    placement: "top-end",
    pauseOnPageIdle: true,


})